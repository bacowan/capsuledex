import supabase from "@/lib/supabase";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ barcode: string }>}
) {
    const { barcode } = await params

    const { data: seriesData, error: seriesError } = await supabase
        .from('series')
        .select('pamphlet!left(file_name, is_front)')
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
    
    return Response.json({ data: seriesData.pamphlet.map(p => {
        const path = `series/${barcode}/pamphlets/${p.is_front ? 'front' : 'back'}/${p.file_name}`
        const { data } = supabase.storage.from('public_images').getPublicUrl(path)
        return {
            "is-front": p.is_front,
            url: data.publicUrl,
            "file-name": p.file_name
        }
    })})
}