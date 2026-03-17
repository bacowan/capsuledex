import authorize from "@/lib/authorize"
import supabase from "@/lib/supabase"
import { z } from 'zod'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ 'user-id': string }>}
) {
    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }
    
    let userId = (await params)['user-id']
    if (userId === 'me') {
        userId = user.id
    }

    const { data: userData, error: userError } = await supabase
        .from('user_profile')
        .select('id, is_collection_public')
        .eq('public_id', userId)
        .single()
    if (userError) {
        return Response.json({ error: "forbidden" }, { status: 403 })
    }

    if (userId !== user.id && !userData.is_collection_public) {
        return Response.json({ error: "forbidden" }, { status: 403 })
    }

    const { data: collectionData, error: collectionError } = await supabase
        .from('user_collection')
        .select("variant(public_id, name, series(barcode, name, line, brand(public_id, name)))")
        .eq('user_id', userData.id)
    
    if (collectionError || !collectionData) {
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    return Response.json({ variants: collectionData.map(c => ({
        id: c.variant.public_id,
        name: c.variant.name,
        series: {
            barcode: c.variant.series.barcode,
            name: c.variant.series.name,
            line: c.variant.series.line,
        },
        brand: {
            id: c.variant.series.brand.public_id,
            name: c.variant.series.brand.name
        }
    }))}, { status: 200 })
}

const formDataSchema = z.object({
    'variant-id': z.uuid()
})

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ 'user-id': string }>}
) {
    const userId = (await params)['user-id']
    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }

    if (userId !== user.id && userId !== "me") {
        return Response.json({ error: "forbidden" }, { status: 403 })
    }

    const body = await request.json()
    // validate input
    const parsedFormData = formDataSchema.safeParse(body)
    if (!parsedFormData.success) {
        return Response.json({ error: z.treeifyError(parsedFormData.error) }, { status: 400 })
    }

    // get foreign keys
    const { data: variantData, error: variantError } = await supabase
        .from('variant')
        .select('id')
        .eq('public_id', parsedFormData.data['variant-id'])
        .single()
    if (variantError) {
        return Response.json({ error: 'Variant with given ID does not exist' }, { status: 422 })
    }

    const { data: userData, error: userError } = await supabase
        .from('user_profile')
        .select('id')
        .eq('public_id', user.id)
        .single()
    if (userError) {
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    // insert data
    const { error: insertError } = await supabase.from('user_collection').upsert({
        variant_id: variantData.id,
        user_id: userData.id
    })
    if (insertError) {
        return Response.json({ error: "Failed to insert the data" }, { status: 500 })
    }

    return Response.json({}, { status: 201 })
}