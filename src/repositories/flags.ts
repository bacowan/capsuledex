import sql from "@/lib/db"

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

export async function deleteFlag(
    barcode: string,
    isFront: boolean,
    fileName: string,
    userId: string,
): Promise<void> {
    await sql`
        DELETE FROM pamphlet_flag
        WHERE pamphlet_id = (
            SELECT p.id
            FROM series AS s
            INNER JOIN pamphlet AS p ON p.series_id = s.id
                AND p.is_front = ${isFront}
                AND p.file_name = ${fileName}
            WHERE s.barcode = ${barcode}
        )
        AND user_id = (
            SELECT id FROM user_profile WHERE public_id = ${userId}
        )
    `
}
