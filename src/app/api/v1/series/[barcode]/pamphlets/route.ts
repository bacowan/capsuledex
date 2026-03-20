import supabase from "@/lib/supabase";
import { getPamphletsByBarcode, Pamphlet } from "./sql/getPamphletsByBarcode";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ barcode: string }>}
) {
    const { barcode } = await params

    let pamphlets: Pamphlet[] | null
    try {
        pamphlets = await getPamphletsByBarcode(barcode)
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }

    if (pamphlets === null) {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    return Response.json({ data: pamphlets.map(p => {
        const path = `series/${barcode}/pamphlets/${p.is_front ? 'front' : 'back'}/${p.file_name}`
        const { data } = supabase.storage.from('public_images').getPublicUrl(path)
        return {
            "is-front": p.is_front,
            url: data.publicUrl,
            "file-name": p.file_name
        }
    })})
}