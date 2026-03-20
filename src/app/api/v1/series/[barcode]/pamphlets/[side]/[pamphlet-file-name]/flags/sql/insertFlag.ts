import sql from "@/lib/db"

// Returns false if the series/pamphlet was not found.
export async function insertFlag(
    barcode: string,
    isFront: boolean,
    fileName: string,
    userId: string,
): Promise<boolean> {
    const rows = await sql`
        INSERT INTO pamphlet_flag (pamphlet_id, user_id)
        SELECT p.id, up.id
        FROM series AS s
        INNER JOIN pamphlet AS p ON p.series_id = s.id
            AND p.is_front = ${isFront}
            AND p.file_name = ${fileName}
        INNER JOIN user_profile AS up ON up.public_id = ${userId}
        WHERE s.barcode = ${barcode}
        RETURNING id
    `

    return rows.length > 0
}
