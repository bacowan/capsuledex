import authorize from "@/lib/supabase/jwtAuthorize"
import { uploadPamphlet } from "@/services/seriesImage"
import { NotFoundError } from "@/services/errors"

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE_BYTES = Number(process.env.MAX_FILE_SIZE_MB ?? 5) * 1024 * 1024

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ barcode: string, type: string }>}
) {
    const { barcode, type } = await params

    const user = await authorize(request)
    if (user instanceof Response) return user

    if (type !== 'P' && type !== 'M') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    const contentType = request.headers.get("content-type") ?? ""
    if (!ALLOWED_MIME_TYPES.includes(contentType)) {
        return Response.json({ error: `Content-Type must be one of: ${ALLOWED_MIME_TYPES.join(", ")}` }, { status: 415 })
    }

    const buffer = await request.arrayBuffer()
    if (buffer.byteLength > MAX_FILE_SIZE_BYTES) {
        return Response.json({ error: `Image must be ${process.env.MAX_FILE_SIZE_MB ?? 5}MB or less` }, { status: 413 })
    }

    try {
        return Response.json(await uploadPamphlet(barcode, type, buffer, contentType, user), { status: 201 })
    } catch (error) {
        if (error instanceof NotFoundError) return Response.json({ error: 'Not found' }, { status: 404 })
        console.log(error)
        return Response.json({ error: "Failed to upload image" }, { status: 500 })
    }
}
