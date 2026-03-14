import supabase from "@/lib/supabase"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ barcode: string }>}
) {
    const { barcode } = await params
    const barcodeInt = parseInt(barcode)
    const { data, error } = await supabase
        .from('series')
        .select('*, brand(*), variant(*)')
        .eq('barcode', barcodeInt)
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