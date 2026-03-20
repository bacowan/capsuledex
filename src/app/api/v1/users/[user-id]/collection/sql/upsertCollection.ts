import sql from "@/lib/db"

// Returns false if the variant or user was not found.
export async function upsertCollection(variantId: string, userId: string): Promise<boolean> {
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
