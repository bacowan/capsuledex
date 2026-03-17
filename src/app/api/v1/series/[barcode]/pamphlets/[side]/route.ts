import authorize from "@/lib/authorize"
import supabase from "@/lib/supabase"
import sharp from "sharp"

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ barcode: string, side: string }>}
) {
    const { barcode, side } = await params

    if (side !== 'front' && side !== 'back') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
    const validSide = side as 'front' | 'back'

    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }

    const contentType = request.headers.get("content-type") ?? ""
    if (!ALLOWED_MIME_TYPES.includes(contentType)) {
        return Response.json({ error: `Content-Type must be one of: ${ALLOWED_MIME_TYPES.join(", ")}` }, { status: 415 })
    }

    const buffer = await request.arrayBuffer()
    if (buffer.byteLength > MAX_FILE_SIZE_BYTES) {
        return Response.json({ error: "Image must be 5MB or less" }, { status: 413 })
    }
    
    const { data: seriesData, error: seriesError } = await supabase
        .from('series')
        .select('*, brand(*), variant(*)')
        .eq('barcode', barcode)
        .single()

    if (seriesError) {
        if (seriesError.code === "PGRST116") {
            return Response.json({ error: 'Not found' }, { status: 404 })
        }
        else {
            console.log(seriesError)
            return Response.json({ error: 'An unexpected error occurred' }, { status: 500 })
        }
    }

    // TODO: moderation

    // remove metadata
    const stripped = await sharp(buffer).toBuffer()

    // check if file exists
    const { data: pamphletData, error: fileCheckError } = await supabase
        .from('pamphlet')
        .select('file_name')
        .eq('series_id', seriesData.id)
        .eq('is_front', validSide === 'front')
        .eq('created_user_id', user.id)
        .maybeSingle()

    if (fileCheckError) {
        return Response.json({ error: "Failed to upload image" }, { status: 500 })
    }

    // upload the new data if it doesn't
    if (pamphletData === null) {
        // upload the file
        const id = crypto.randomUUID()
        const fileName = `${id}.${contentType.slice('image/'.length)}`
        const path = `series/${barcode}/pamphlets/${validSide}/${fileName}`
        const { error: uploadError } = await supabase.storage
            .from('public_images')
            .upload(path, stripped)
        if (uploadError) {
            return Response.json({ error: "Failed to upload image" }, { status: 500 })
        }
        const { data } = supabase.storage.from('public_images').getPublicUrl(path)

        // update the database
        const { error: insertError } = await supabase.from('pamphlet').insert({
            file_name: fileName,
            is_front: validSide === 'front',
            created_user_id: user.id,
            series_id: seriesData.id,
        })

        if (insertError) {
            // rollback
            await supabase.storage
                .from('public_images')
                .remove([path])
            return Response.json({ error: "Failed to upload image" }, { status: 500 })
        }

        return Response.json({ url: data.publicUrl }, { status: 201 })
    }
    // update the file if it does
    else {
        const path = `series/${barcode}/pamphlets/${validSide}/${pamphletData.file_name}`
        const { error: uploadError } = await supabase.storage
            .from('public_images')
            .update(path, stripped)
        if (uploadError) {
            return Response.json({ error: "Failed to upload image" }, { status: 500 })
        }
        const { data } = supabase.storage.from('public_images').getPublicUrl(path)
        return Response.json({ url: data.publicUrl }, { status: 201 })
    }
}
