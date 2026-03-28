import authorize from "@/lib/supabase/jwtAuthorize"
import { z } from 'zod'
import { getCollection, addToCollection, removeFromCollection } from "@/services/collection"
import { ForbiddenError, NotFoundError } from "@/services/errors"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ 'user-id': string }>}
) {
    const user = await authorize(request)
    if (user instanceof Response) return user

    let userId = (await params)['user-id']
    if (userId === 'me') userId = user.id

    try {
        return Response.json(await getCollection(userId, user))
    } catch (error) {
        if (error instanceof ForbiddenError) return Response.json({ error: 'forbidden' }, { status: 403 })
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }
}

const variantIdSchema = z.object({ 'variant-id': z.uuid() })

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ 'user-id': string }>}
) {
    const userId = (await params)['user-id']
    const user = await authorize(request)
    if (user instanceof Response) return user

    if (userId !== user.id && userId !== 'me') {
        return Response.json({ error: 'forbidden' }, { status: 403 })
    }

    const parsedBody = variantIdSchema.safeParse(await request.json())
    if (!parsedBody.success) {
        return Response.json({ error: z.treeifyError(parsedBody.error) }, { status: 400 })
    }

    try {
        await addToCollection(parsedBody.data['variant-id'], user)
        return Response.json({}, { status: 201 })
    } catch (error) {
        if (error instanceof NotFoundError) return Response.json({ error: 'Variant with given ID does not exist' }, { status: 422 })
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ 'user-id': string }>}
) {
    const userId = (await params)['user-id']
    const user = await authorize(request)
    if (user instanceof Response) return user

    if (userId !== user.id && userId !== 'me') {
        return Response.json({ error: 'forbidden' }, { status: 403 })
    }

    const parsedBody = variantIdSchema.safeParse(await request.json())
    if (!parsedBody.success) {
        return Response.json({ error: z.treeifyError(parsedBody.error) }, { status: 400 })
    }

    try {
        await removeFromCollection(parsedBody.data['variant-id'], user)
        return new Response(null, { status: 204 })
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }
}
