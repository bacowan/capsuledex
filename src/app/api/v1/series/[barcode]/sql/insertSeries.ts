import sql from "@/lib/db"
import { z } from "zod"
import { type TransactionSql } from "postgres"

const idSchema = z.object({
    public_id: z.string()
})

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

    return z.array(idSchema)
        .parse(rows)
        .map(r => r.public_id)
}
