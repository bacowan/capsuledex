import sql from "@/lib/db"
import { z } from "zod"

const rowSchema = z.object({
    file_name: z.string().nullable(),
    type: z.enum(['P', 'M']).nullable(),
})

const seriesImageSchema = z.object({
    file_name: z.string(),
    type: z.enum(['P', 'M']),
})

export type SeriesImageRow = z.infer<typeof seriesImageSchema>

export async function findSeriesImagesByBarcode(barcode: string): Promise<SeriesImageRow[] | null> {
    const rows = await sql`
        SELECT p.file_name, p.is_front
        FROM series AS s
        LEFT JOIN series_image AS p ON p.series_id = s.id
        WHERE s.barcode = ${barcode}
    `

    if (rows.length === 0) return null

    return rows
        .map(r => rowSchema.parse(r))
        .filter(r => r.file_name !== null && r.type !== null)
        .map(r => seriesImageSchema.parse(r))
}

// Returns false if the series was not found.
export async function upsertSeriesImage(
    barcode: string,
    fileName: string,
    type: 'P' | 'M',
    userId: string,
): Promise<boolean> {
    const rows = await sql`
        INSERT INTO series_image (file_name, type, created_user_id, series_id)
        SELECT ${fileName}, ${type}, ${userId}, s.id
        FROM series AS s
        WHERE s.barcode = ${barcode}
        ON CONFLICT (type, created_user_id, series_id)
        DO UPDATE SET file_name = series_image.file_name
        RETURNING file_name
    `

    return rows.length === 0
}
