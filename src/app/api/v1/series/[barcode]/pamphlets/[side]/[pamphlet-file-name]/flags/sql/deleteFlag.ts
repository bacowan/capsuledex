import sql from "@/lib/db"

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
