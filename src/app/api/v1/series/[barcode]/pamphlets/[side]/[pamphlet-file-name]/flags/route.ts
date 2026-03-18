import authorize from "@/lib/authorize"
import supabase from "@/lib/supabase"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ barcode: string, side: string, 'pamphlet-file-name': string }>}
) {
    const { barcode, side, 'pamphlet-file-name': pamphletFileName } = await params

    if (side !== 'front' && side !== 'back') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
    const validSide = side as 'front' | 'back'

    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }

    const { data: seriesData, error: seriesError } = await supabase
        .from('series')
        .select('pamphlet!left(id)')
        .eq('barcode', barcode)
        .eq('pamphlet.is_front', validSide === 'front')
        .eq('pamphlet.file_name', pamphletFileName)
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

    if (seriesData.pamphlet.length === 0) {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    const { data: userData, error: userError } = await supabase
        .from('user_profile')
        .select('id')
        .eq('public_id', user.id)
        .single()
    if (userError) {
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    const { data: insertedData, error: insertError } = await supabase.from('pamphlet_flag').insert({
        pamphlet_id: seriesData.pamphlet[0].id,
        user_id: userData.id
    })

    if (insertError) {
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    return Response.json({}, { status: 201 })
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ barcode: string, side: string, 'pamphlet-file-name': string }>}
) {
    const { barcode, side, 'pamphlet-file-name': pamphletFileName } = await params

    if (side !== 'front' && side !== 'back') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
    const validSide = side as 'front' | 'back'

    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }

    const { data: seriesData, error: seriesError } = await supabase
        .from('series')
        .select('pamphlet!left(id)')
        .eq('barcode', barcode)
        .eq('pamphlet.is_front', validSide === 'front')
        .eq('pamphlet.file_name', pamphletFileName)
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

    if (seriesData.pamphlet.length === 0) {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    const { data: userData, error: userError } = await supabase
        .from('user_profile')
        .select('id')
        .eq('public_id', user.id)
        .single()
    if (userError) {
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    const { data: insertedData, error: insertError } = await supabase.from('pamphlet_flag')
        .delete()
        .eq('id', seriesData.pamphlet[0].id)
    if (insertError) {
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    return Response.json({}, { status: 204 })
}