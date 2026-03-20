import sql from "@/lib/db"
import { z } from "zod"

const seriesSchema = z.object({
    barcode: z.string(),
    line: z.string().nullable(),
    name: z.string().nullable(),
    url: z.string().nullable(),
    pamphlet_front_id: z.string().nullable(),
    pamphlet_back_id: z.string().nullable(),
    brand: z.object({
        id: z.string(),
        name: z.string(),
        url: z.string().nullable(),
    }),
    variants: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })).nullable(),
})

export type Series = z.infer<typeof seriesSchema>

export async function getSeriesByBarcode(barcode: string): Promise<Series | null> {
    const rows = await sql`
        SELECT
            s.barcode, s.line, s.name, s.official_url AS url, s.pamphlet_front_id, s.pamphlet_back_id,
            json_build_object(
                'id', b.public_id,
                'name', b.name,
                'url', b.official_url
            ) AS brand,
            json_agg(json_build_object(
                'id', v.id,
                'name', v.name
            )) AS variants
        FROM series AS s
        INNER JOIN brand AS b ON s.brand_id = b.id
        LEFT JOIN variant AS v ON v.series_id = s.id
        WHERE s.barcode = ${barcode}
        GROUP BY s.id, b.id
    `

    if (rows.length === 0) return null

    return seriesSchema.parse(rows[0])
}
