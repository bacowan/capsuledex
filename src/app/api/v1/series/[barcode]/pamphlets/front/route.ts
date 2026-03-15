import supabase from "@/lib/supabase"

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export async function POST(
    request: Request,
    { params }: { params: Promise<{ barcode: string }>}
) {
    const contentType = request.headers.get("content-type") ?? ""
    if (!ALLOWED_MIME_TYPES.includes(contentType)) {
        return Response.json({ error: `Content-Type must be one of: ${ALLOWED_MIME_TYPES.join(", ")}` }, { status: 415 })
    }

    const buffer = await request.arrayBuffer()
    if (buffer.byteLength > MAX_FILE_SIZE_BYTES) {
        return Response.json({ error: "Image must be 5MB or less" }, { status: 413 })
    }
    
    const { barcode } = await params
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

    const id = crypto.randomUUID()
    const path = `series/${barcode}/pamphlets/front/${id}.${contentType.slice('image/'.length)}`
    const { error: uploadError } = await supabase.storage
        .from('public_images')
        .upload(path, buffer)
    if (uploadError) {
        return Response.json({ error: "Failed to upload image" }, { status: 500 })
    }
    const { data } = supabase.storage.from('public_images').getPublicUrl(path)
    return Response.json({ url: data.publicUrl }, { status: 201 })
}
