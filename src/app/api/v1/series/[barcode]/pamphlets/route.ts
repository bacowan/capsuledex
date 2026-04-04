import { getPamphlets } from "@/services/seriesImage"
import { NotFoundError } from "@/services/errors"

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ barcode: string }>}
) {
    const { barcode } = await params

    try {
        return Response.json({ data: await getPamphlets(barcode) })
    } catch (error) {
        if (error instanceof NotFoundError) return Response.json({ error: 'Not found' }, { status: 404 })
        console.log(error)
        return Response.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }
}
