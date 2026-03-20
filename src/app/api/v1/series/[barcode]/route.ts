import isBarcodeValid from "@/lib/barcode"
import supabase from "@/lib/supabase"
import { z } from 'zod'
import { getSeriesByBarcode, Series } from "./sql/getSeriesByBarcode"

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

    // check for duplicate
    const { data: existingSeries } = await supabase
        .from('series')
        .select('id')
        .eq('barcode', barcode)
        .maybeSingle()
    if (existingSeries !== null) {
        return Response.json({ error: `Series with given barcode already exists` }, { status: 409 })
    }

    // get foreign keys
    const { data: brandData, error: brandError } = await supabase
        .from('brand')
        .select()
        .eq('public_id', parsedFormData.data.brand_id)
        .single()
    if (brandError) {
        return Response.json({ error: 'Brand with given ID does not exist' }, { status: 422 })
    }

    // validate barcode
    if (!isBarcodeValid(barcode)) {
        return Response.json({ error: "Invalid barcode" }, { status: 415 })
    }

    // insert data
    const { data: insertedData, error: insertError } = await supabase.from('series').insert({
        barcode: barcode,
        name: parsedFormData.data.name,
        line: parsedFormData.data.line,
        brand_id: brandData.id
    }).select('id')
    if (insertError) {
        return Response.json({ error: "Failed to insert series" }, { status: 500 })
    }

    const { error: insertVariantsError } = await supabase.from('variant')
        .insert(parsedFormData.data.variants.map(v => ({
            public_id: crypto.randomUUID(),
            name: v,
            series_id: insertedData[0].id
        })));
    
    if (insertVariantsError) {
        // rollback
        supabase.from('series').delete().eq('barcode', barcode)
        return Response.json({ error: "Failed to insert series" }, { status: 500 })
    }

    return Response.json({ barcode: barcode }, { status: 201 })
}