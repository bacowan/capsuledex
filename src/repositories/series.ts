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
        id: z.string(),
        name: z.string(),
    })).nullable(),
})

export type SeriesRow = z.infer<typeof seriesSchema>

export async function findSeriesByBarcode(barcode: string): Promise<SeriesRow | null> {
    const rows = await sql`
        SELECT
            s.barcode, s.line, s.name, s.official_url AS url, s.pamphlet_front_id, s.pamphlet_back_id,
            json_build_object(
                'id', b.public_id,
                'name', b.name,
                'url', b.official_url
            ) AS brand,
            json_agg(json_build_object(
                'id', v.public_id,
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

const idSchema = z.object({ public_id: z.string() })

export async function insertSeries(
    barcode: string,
    name: string | null,
    line: string | null,
    brandId: string,
    variants: string[]
): Promise<string[]> {
    const rows = await sql`
        WITH inserted_series AS (
            INSERT INTO series (barcode, name, line, brand_id)
            SELECT ${barcode}, ${name}, ${line}, b.id
            FROM brand AS b
            WHERE b.public_id = ${brandId}
            RETURNING id
        )
        INSERT INTO variant (name, series_id)
        SELECT v.name, inserted_series.id
        FROM UNNEST(${variants}::text[]) as v(name)
        CROSS JOIN inserted_series
        RETURNING variant.public_id
    `

    return z.array(idSchema).parse(rows).map(r => r.public_id)
}
