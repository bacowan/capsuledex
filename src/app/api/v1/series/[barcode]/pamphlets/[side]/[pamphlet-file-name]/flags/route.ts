import authorize from "@/lib/authorize"
import { insertFlag } from "./sql/insertFlag"
import { deleteFlag } from "./sql/deleteFlag"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ barcode: string, side: string, 'pamphlet-file-name': string }>}
) {
    const { barcode, side, 'pamphlet-file-name': pamphletFileName } = await params

    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }

    if (side !== 'front' && side !== 'back') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
    const validSide = side as 'front' | 'back'

    let found: boolean
    try {
        found = await insertFlag(
            barcode,
            validSide === 'front',
            pamphletFileName,
            user.id)
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    if (!found) {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    return Response.json({}, { status: 201 })
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ barcode: string, side: string, 'pamphlet-file-name': string }>}
) {
    const { barcode, side, 'pamphlet-file-name': pamphletFileName } = await params

    const user = await authorize(request)
    if (user instanceof Response) {
        return user
    }

    if (side !== 'front' && side !== 'back') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
    const validSide = side as 'front' | 'back'

    try {
        await deleteFlag(barcode, validSide === 'front', pamphletFileName, user.id)
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }

    return new Response(null, { status: 204 })
}
