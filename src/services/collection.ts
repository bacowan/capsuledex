import { ForbiddenError, NotFoundError } from "./errors"
import { findCollection, insertCollection, deleteCollection } from "@/repositories/collection"

export type CollectionResponse = {
    variants: {
        id: string
        name: string | null
        series: { barcode: number; name: string | null; line: string | null }
        brand: { id: string; name: string }
    }[]
}

// throws ForbiddenError
export async function getCollection(
    userId: string,
    requestingUser: { id: string },
): Promise<CollectionResponse> {
    const data = await findCollection(userId)
    if (!data) throw new ForbiddenError()
    if (userId !== requestingUser.id && !data.is_collection_public) throw new ForbiddenError()

    return {
        variants: (data.collection ?? []).map(c => ({
            id: c.variant_id,
            name: c.variant_name,
            series: { barcode: c.barcode, name: c.series_name, line: c.line },
            brand: { id: c.brand_id, name: c.brand_name },
        }))
    }
}

// throws NotFoundError
export async function addToCollection(
    variantId: string,
    user: { id: string },
): Promise<void> {
    const found = await insertCollection(variantId, user.id)
    if (!found) throw new NotFoundError()
}

export async function removeFromCollection(
    variantId: string,
    user: { id: string },
): Promise<void> {
    await deleteCollection(variantId, user.id)
}
