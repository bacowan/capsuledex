import sql from "@/lib/db"
import { z } from "zod"

const collectionSchema = z.object({
    is_collection_public: z.boolean(),
    collection: z.array(z.object({
        variant_id: z.string(),
        variant_name: z.string().nullable(),
        barcode: z.number(),
        series_name: z.string().nullable(),
        line: z.string().nullable(),
        brand_id: z.string(),
        brand_name: z.string(),
    })).nullable(),
})

export type CollectionRow = z.infer<typeof collectionSchema>

export async function findCollection(userId: string): Promise<CollectionRow | null> {
    const rows = await sql`
        SELECT
            up.is_collection_public,
            json_agg(json_build_object(
                'variant_id', v.public_id,
                'variant_name', v.name,
                'barcode', s.barcode,
                'series_name', s.name,
                'line', s.line,
                'brand_id', b.public_id,
                'brand_name', b.name
            )) FILTER (WHERE v.id IS NOT NULL) AS collection
        FROM user_profile AS up
        LEFT JOIN user_collection AS uc ON uc.user_id = up.id
        LEFT JOIN variant AS v ON v.id = uc.variant_id
        LEFT JOIN series AS s ON s.id = v.series_id
        LEFT JOIN brand AS b ON b.id = s.brand_id
        WHERE up.public_id = ${userId}
        GROUP BY up.id
    `

    if (rows.length === 0) return null

    return collectionSchema.parse(rows[0])
}

// Returns false if the variant or user was not found.
export async function insertCollection(variantId: string, userId: string): Promise<boolean> {
    const rows = await sql`
        INSERT INTO user_collection (variant_id, user_id)
        SELECT v.id, up.id
        FROM variant AS v
        INNER JOIN user_profile AS up
        WHERE v.public_id = ${variantId}
        AND up.public_id = ${userId}
        ON CONFLICT (variant_id, user_id) DO NOTHING
        RETURNING variant_id
    `

    return rows.length > 0
}

export async function deleteCollection(variantId: string, userId: string): Promise<void> {
    await sql`
        DELETE FROM user_collection
        WHERE variant_id = (SELECT id FROM variant WHERE public_id = ${variantId})
        AND user_id = (SELECT id FROM user_profile WHERE public_id = ${userId})
    `
}
