import sql from "@/lib/db"
import { z } from "zod"

const rowSchema = z.object({
    file_name: z.string().nullable(),
    is_front: z.boolean().nullable(),
})

const pamphletSchema = z.object({
    file_name: z.string(),
    is_front: z.boolean(),
})

export type PamphletRow = z.infer<typeof pamphletSchema>

export async function findPamphletsByBarcode(barcode: string): Promise<PamphletRow[] | null> {
    const rows = await sql`
        SELECT p.file_name, p.is_front
        FROM series AS s
        LEFT JOIN pamphlet AS p ON p.series_id = s.id
        WHERE s.barcode = ${barcode}
    `

    if (rows.length === 0) return null

    return rows
        .map(r => rowSchema.parse(r))
        .filter(r => r.file_name !== null && r.is_front !== null)
        .map(r => pamphletSchema.parse(r))
}

// Returns false if the series was not found.
export async function upsertPamphlet(
    barcode: string,
    fileName: string,
    isFront: boolean,
    userId: string,
): Promise<boolean> {
    const rows = await sql`
        INSERT INTO pamphlet (file_name, is_front, created_user_id, series_id)
        SELECT ${fileName}, ${isFront}, ${userId}, s.id
        FROM series AS s
        WHERE s.barcode = ${barcode}
        ON CONFLICT (is_front, created_user_id, series_id)
        DO UPDATE SET file_name = pamphlet.file_name
        RETURNING file_name
    `

    return rows.length === 0
}
