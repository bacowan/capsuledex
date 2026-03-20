import sql from "@/lib/db"
import { z } from "zod"

const schema = z.object({
    file_name: z.string(),
})

// Returns the file_name to use for storage (existing on conflict, new on insert).
// Returns null if the series barcode does not exist.
export async function upsertPamphlet(
    barcode: string,
    fileName: string,
    isFront: boolean,
    userId: string,
): Promise<string | null> {
    const rows = await sql`
        INSERT INTO pamphlet (file_name, is_front, created_user_id, series_id)
        SELECT ${fileName}, ${isFront}, ${userId}, s.id
        FROM series AS s
        WHERE s.barcode = ${barcode}
        ON CONFLICT (is_front, created_user_id, series_id)
        DO UPDATE SET file_name = pamphlet.file_name
        RETURNING file_name
    `

    if (rows.length === 0) return null

    return schema.parse(rows[0]).file_name
}
