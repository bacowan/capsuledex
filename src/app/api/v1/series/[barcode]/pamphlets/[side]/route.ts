import authorize from "@/lib/authorize"
import supabase from "@/lib/supabase"
import sharp from "sharp"
import sql from "@/lib/db"
import { upsertPamphlet } from "./sql/upsertPamphlet"

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ barcode: string, side: string }>}
) {
    const { barcode, side } = await params

    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }

    if (side !== 'front' && side !== 'back') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
    const validSide = side as 'front' | 'back'

    const contentType = request.headers.get("content-type") ?? ""
    if (!ALLOWED_MIME_TYPES.includes(contentType)) {
        return Response.json({ error: `Content-Type must be one of: ${ALLOWED_MIME_TYPES.join(", ")}` }, { status: 415 })
    }

    const buffer = await request.arrayBuffer()
    if (buffer.byteLength > MAX_FILE_SIZE_BYTES) {
        return Response.json({ error: "Image must be 5MB or less" }, { status: 413 })
    }

    // TODO: moderation

    const stripped = await sharp(Buffer.from(buffer)).toBuffer()
    const newFileName = `${crypto.randomUUID()}.${contentType.slice('image/'.length)}`

    let publicUrl: string
    try {
        publicUrl = await sql.begin(async _tx => {
            const fileName = await upsertPamphlet(
                barcode,
                newFileName,
                validSide === 'front',
                user.id)
            if (fileName === null) throw { notFound: true }

            const path = `series/${barcode}/pamphlets/${validSide}/${fileName}`
            const { error: uploadError } = await supabase.storage
                .from('public_images')
                .upload(path, stripped, { upsert: true })
            if (uploadError) throw uploadError

            return supabase.storage.from('public_images').getPublicUrl(path).data.publicUrl
        })
    } catch (error: any) {
        if (error?.notFound) {
            return Response.json({ error: 'Not found' }, { status: 404 })
        }
        console.log(error)
        return Response.json({ error: "Failed to upload image" }, { status: 500 })
    }

    return Response.json({ url: publicUrl }, { status: 201 })
}
