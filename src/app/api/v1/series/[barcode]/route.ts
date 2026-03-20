import isBarcodeValid from "@/lib/barcode"
import supabase from "@/lib/supabase"
import { z } from 'zod'
import { getSeriesByBarcode, Series } from "./sql/getSeriesByBarcode"
import { insertSeries } from "./sql/insertSeries"
import postgres from "postgres"
import { ERROR_CODES } from "@/lib/dbConstants"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ barcode: string }>}
) {
    const { barcode } = await params

    let series: Series | null
    try {
        series = await getSeriesByBarcode(barcode)
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }

    if (series === null) {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    return Response.json({
        "barcode": series.barcode,
        "line": series.line,
        "name": series.name,
        "url": series.url,
        "pamphlet-front-id": series.pamphlet_front_id,
        "pamphlet-back-id": series.pamphlet_back_id,
        "brand": {
            id: series.brand.id,
            name: series.brand.name,
            url: series.brand.url
        },
        "variants": series.variants?.map(v => ({
            id: v.id,
            name: v.name
        })) ?? [],
    }, { status: 200 })
}

const formDataSchema = z.object({
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

    // validate input
    const parsedFormData = formDataSchema.safeParse(body)
    if (!parsedFormData.success) {
        return Response.json({ error: z.treeifyError(parsedFormData.error) }, { status: 400 })
    }

    // validate barcode
    if (!isBarcodeValid(barcode)) {
        return Response.json({ error: "Invalid barcode" }, { status: 415 })
    }

    let insertedData: string[]
    try {
        insertedData = await insertSeries(
            barcode,
            parsedFormData.data.name ?? null,
            parsedFormData.data.line ?? null,
            parsedFormData.data.brand_id,
            parsedFormData.data.variants)
    }
    catch (error) {
        if (error instanceof postgres.PostgresError && error.code === ERROR_CODES.UNIQUE_VIOLATION) {
            return Response.json({ error: `Series with given barcode already exists` }, { status: 409 })
        }
        else if (error instanceof postgres.PostgresError && error.code === ERROR_CODES.FOREIGN_KEY_VIOLATION) {
            return Response.json({ error: 'Brand with given ID does not exist' }, { status: 422 })
        }
        else {
            return Response.json({ error: "Failed to insert" }, { status: 500 })
        }
    }
    return Response.json({
        barcode: barcode,
        variants: insertedData
    }, { status: 201 })
}