import sql from "@/lib/db"

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
