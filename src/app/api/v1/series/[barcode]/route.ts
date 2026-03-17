import isBarcodeValid from "@/lib/barcode"
import supabase from "@/lib/supabase"
import { z } from 'zod'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ barcode: string }>}
) {
    const { barcode } = await params
    const { data, error } = await supabase
        .from('series')
        .select('*, brand(*), variant(*)')
        .eq('barcode', barcode)
        .single()
    if (error) {
        if (error.code === "PGRST116") {
            return Response.json({ error: 'Not found' }, { status: 404 })
        }
        else {
            console.log(error)
            return Response.json({ error: 'An unexpected error occurred' }, { status: 500 })
        }
    }
    else {
        return Response.json({
            "barcode": data.barcode,
            "line": data.line,
            "name": data.name,
            "url": data.official_url,
            "pamphlet-front-id": data.pamphlet_front_id,
            "pamphlet-back-id": data.pamphlet_back_id,
            "brand": {
                "id": data.brand.public_id,
                "name": data.brand.name,
                "url": data.brand.official_url
            },
            "variants": data.variant.map(v => ({
                id: v.id,
                name: v.name
            }))
        })
    }
}

const formDataSchema = z.object({
    name: z.string().optional(),
    line: z.string().optional(),
    brand_id: z.string(),
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
    const { error: insertError } = await supabase.from('series').insert({
        barcode: barcode,
        name: parsedFormData.data.name,
        line: parsedFormData.data.line,
        brand_id: brandData.id
    })
    if (insertError) {
        return Response.json({ error: "Failed to insert series" }, { status: 500 })
    }

    return Response.json({ barcode: barcode }, { status: 201 })
}