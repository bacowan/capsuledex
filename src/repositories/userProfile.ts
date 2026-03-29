import sql from "@/lib/db"
import { z } from "zod"

const userProfileSchema = z.object({
    id: z.coerce.number(),
    is_collection_public: z.boolean(),
})

export type UserProfileRow = z.infer<typeof userProfileSchema>

export const findUserProfileByPublicId = async (publicId: string): Promise<UserProfileRow | null> => {
    const rows = await sql`
        SELECT id, is_collection_public
        FROM user_profile
        WHERE public_id = ${publicId}
    `

    if (rows.length === 0) return null

    return userProfileSchema.parse(rows[0])
}