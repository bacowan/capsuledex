import sql from "@/lib/db"
import { z } from "zod"

const schema = z.object({
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

export type Collection = z.infer<typeof schema>

export async function getCollection(userId: string): Promise<Collection | null> {
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

    return schema.parse(rows[0])
}
