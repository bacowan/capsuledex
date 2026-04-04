import sql from "@/lib/db"
import postgres from "postgres"
import { z } from "zod"

const seriesSchema = z.object({
    barcode: z.string(),
    line: z.string().nullable(),
    name: z.string().nullable(),
    url: z.string().nullable(),
    main_image: z.object({
        file_name: z.string(),
        type: z.enum(["M", "P"])
    }).nullable(),
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
            s.barcode, s.line, s.name, s.official_url AS url,
            json_build_object(
                'id', b.public_id,
                'name', b.name,
                'url', b.official_url
            ) AS brand,
            json_agg(json_build_object(
                'id', v.public_id,
                'name', v.name
            )) AS variants,
            (SELECT p.file_name, p.type
                FROM series_image AS si
                WHERE si.series_id = s.id
                ORDER BY p.id ASC LIMIT 1
            ) AS main_image
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

const seriesListItemSchema = z.object({
    barcode: z.string(),
    line: z.string().nullable(),
    name: z.string().nullable(),
    main_image_file_name: z.string().nullable(),
    main_image_type: z.enum(["M", "P"]).nullable(),
    brand: z.string(),
    variant_file_names: z.array(z.string())
})

export type SeriesListItem = z.infer<typeof seriesListItemSchema>

export async function listSeries(
    query: string | null,
    sort: "recent" | "popular" | "alphabetical",
    page: number,
    pageSize: number
): Promise<SeriesListItem[]> {
    let orderBy: postgres.PendingQuery<postgres.Row[]>
    let extraJoins: postgres.PendingQuery<postgres.Row[]>
    let where: postgres.PendingQuery<postgres.Row[]>
    let paginate = sql`
        LIMIT ${pageSize} OFFSET ${page * pageSize}
    `
    if (sort === "recent") {
        extraJoins = sql``
        orderBy = sql`
            ORDER BY s.created_on DESC
        `
    }
    else if (sort === "popular") {
        extraJoins = sql`
            LEFT JOIN user_collection AS c ON c.variant_id = v.id
        `
        orderBy = sql`
            ORDER BY COUNT(v.id) DESC
        `
    }
    else {
        extraJoins = sql``
        orderBy = sql`
            ORDER BY s.name DESC
        `
    }
    if (query === null) {
        where = sql``
    }
    else {
        where = sql`
            WHERE s.name LIKE ${"%" + query + "%"} OR b.name LIKE ${"%" + query + "%"}
        `
    }
    const rows = await sql`
        SELECT 
            s.barcode,
            s.line,
            s.name,
            b.name AS brand,
            COALESCE(
                json_agg(
                    vi.file_name
                ) FILTER (WHERE vi.file_name IS NOT NULL),
                '[]') AS variant_file_names,
            main_image.file_name AS main_image_file_name,
            main_image.type AS main_image_type
        FROM series AS s
        INNER JOIN brand AS b ON s.brand_id = b.id
        LEFT JOIN variant AS v ON v.series_id = s.id
        LEFT JOIN variant_image AS vi ON vi.variant_id = v.id
        LEFT JOIN (
            SELECT DISTINCT ON (series_id) file_name, type, series_id
            FROM series_image
            ORDER BY series_id, id ASC
        ) AS main_image ON main_image.series_id = s.id
        ${extraJoins}
        ${where}
        GROUP BY s.barcode, s.line, s.name, b.name, main_image.file_name, main_image.type
        ${orderBy}
        ${paginate}
    `
    return z.array(seriesListItemSchema).parse(rows)
}