import sql from "@/lib/db"

export async function deleteCollection(variantId: string, userId: string): Promise<void> {
    await sql`
        DELETE FROM user_collection
        WHERE variant_id = (SELECT id FROM variant WHERE public_id = ${variantId})
        AND user_id = (SELECT id FROM user_profile WHERE public_id = ${userId})
    `
}
