import authorize from "@/lib/authorize"
import { z } from 'zod'
import { getCollection } from "./sql/getCollection"
import { upsertCollection } from "./sql/upsertCollection"
import { deleteCollection } from "./sql/deleteCollection"

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

    let collection: Awaited<ReturnType<typeof getCollection>>
    try {
        collection = await getCollection(userId)
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    if (collection === null) {
        return Response.json({ error: 'forbidden' }, { status: 403 })
    }

    if (userId !== user.id && !collection.is_collection_public) {
        return Response.json({ error: 'forbidden' }, { status: 403 })
    }

    return Response.json({ variants: (collection.collection ?? []).map(c => ({
        id: c.variant_id,
        name: c.variant_name,
        series: {
            barcode: c.barcode,
            name: c.series_name,
            line: c.line,
        },
        brand: {
            id: c.brand_id,
            name: c.brand_name,
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

    if (userId !== user.id && userId !== 'me') {
        return Response.json({ error: 'forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const parsedFormData = formDataSchema.safeParse(body)
    if (!parsedFormData.success) {
        return Response.json({ error: z.treeifyError(parsedFormData.error) }, { status: 400 })
    }

    let found: boolean
    try {
        found = await upsertCollection(parsedFormData.data['variant-id'], user.id)
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    if (!found) {
        return Response.json({ error: 'Variant with given ID does not exist' }, { status: 422 })
    }

    return Response.json({}, { status: 201 })
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ 'user-id': string }>}
) {
    const userId = (await params)['user-id']
    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }

    if (userId !== user.id && userId !== 'me') {
        return Response.json({ error: 'forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const parsedFormData = formDataSchema.safeParse(body)
    if (!parsedFormData.success) {
        return Response.json({ error: z.treeifyError(parsedFormData.error) }, { status: 400 })
    }

    try {
        await deleteCollection(parsedFormData.data['variant-id'], user.id)
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    return new Response(null, { status: 204 })
}
