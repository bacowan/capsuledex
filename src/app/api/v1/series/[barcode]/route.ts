import isBarcodeValid from "@/lib/barcode"
import { z } from 'zod'
import { getSeries, createSeries } from "@/services/series"
import { ConflictError, NotFoundError, UnprocessableError } from "@/services/errors"

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ barcode: string }>}
) {
    const { barcode } = await params

    try {
        return Response.json(await getSeries(barcode))
    } catch (error) {
        if (error instanceof NotFoundError) return Response.json({ error: 'Not found' }, { status: 404 })
        console.log(error)
        return Response.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }
}

const postSchema = z.object({
    name: z.string().optional(),
    line: z.string().optional(),
    brand_id: z.uuid(),
    variants: z.array(z.string())
})

export async function POST(
    request: Request,
    { params }: { params: Promise<{ barcode: string }> }
) {
    const { barcode } = await params
    const body = await request.json()

    const parsedBody = postSchema.safeParse(body)
    if (!parsedBody.success) {
        return Response.json({ error: z.treeifyError(parsedBody.error) }, { status: 400 })
    }

    if (!isBarcodeValid(barcode)) {
        return Response.json({ error: "Invalid barcode" }, { status: 415 })
    }

    try {
        return Response.json(await createSeries(
            barcode,
            parsedBody.data.name ?? null,
            parsedBody.data.line ?? null,
            parsedBody.data.brand_id,
            parsedBody.data.variants
        ), { status: 201 })
    } catch (error) {
        if (error instanceof ConflictError) return Response.json({ error: error.message }, { status: 409 })
        if (error instanceof UnprocessableError) return Response.json({ error: error.message }, { status: 422 })
        console.log(error)
        return Response.json({ error: "Failed to insert" }, { status: 500 })
    }
}
