import authorize from "@/lib/supabase/jwtAuthorize"
import { addFlag, removeFlag } from "@/services/flags"
import { NotFoundError } from "@/services/errors"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ barcode: string, side: string, 'pamphlet-file-name': string }>}
) {
    const { barcode, side, 'pamphlet-file-name': pamphletFileName } = await params

    const user = await authorize(request)
    if (user instanceof Response) return user

    if (side !== 'front' && side !== 'back') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    try {
        await addFlag(barcode, side === 'front', pamphletFileName, user)
        return Response.json({}, { status: 201 })
    } catch (error) {
        if (error instanceof NotFoundError) return Response.json({ error: 'Not found' }, { status: 404 })
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ barcode: string, side: string, 'pamphlet-file-name': string }>}
) {
    const { barcode, side, 'pamphlet-file-name': pamphletFileName } = await params

    const user = await authorize(request)
    if (user instanceof Response) return user

    if (side !== 'front' && side !== 'back') {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    try {
        await removeFlag(barcode, side === 'front', pamphletFileName, user)
        return new Response(null, { status: 204 })
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Unexpected error' }, { status: 500 })
    }
}
