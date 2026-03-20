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

export type Pamphlet = z.infer<typeof pamphletSchema>

export async function getPamphletsByBarcode(barcode: string): Promise<Pamphlet[] | null> {
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
