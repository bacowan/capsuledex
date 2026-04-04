import sql from "@/lib/db"
import supabase from "@/lib/supabase/jwtSupabase"
import sharp from "sharp"
import { NotFoundError } from "./errors"
import { findSeriesImagesByBarcode, upsertSeriesImage } from "@/repositories/seriesImage"
import { getSeriesImagePath } from "@/lib/supabaseStorage"

export type SeriesImageResponse = {
    type: 'P' | 'M'
    url: string
    'file-name': string
}

// throws NotFoundError
export async function getSeriesImages(barcode: string): Promise<SeriesImageResponse[]> {
    const seriesImages = await findSeriesImagesByBarcode(barcode)
    if (!seriesImages) throw new NotFoundError()

    return seriesImages.map(p => {
        const path = `series/${barcode}/images/${p.type}/${p.file_name}`
        return {
            type: p.type,
            url: supabase.storage.from('public_images').getPublicUrl(path).data.publicUrl,
            'file-name': p.file_name,
        }
    })
}

// throws NotFoundError
export async function uploadPamphlet(
    barcode: string,
    type: 'P' | 'M',
    imageBuffer: ArrayBuffer,
    contentType: string,
    user: { id: string },
): Promise<{ url: string }> {
    const stripped = await sharp(Buffer.from(imageBuffer)).toBuffer()
    const newFileName = `${crypto.randomUUID()}.${contentType.slice('image/'.length)}`

    const url = await sql.begin(async _tx => {
        const found = await upsertSeriesImage(barcode, newFileName, type, user.id)
        if (!found) throw new NotFoundError()

        const path = getSeriesImagePath(barcode, newFileName, type)
        const { error: uploadError } = await supabase.storage
            .from('public_images')
            .upload(path, stripped, { upsert: true })
        if (uploadError) throw uploadError

        return supabase.storage.from('public_images').getPublicUrl(path).data.publicUrl
    })

    return { url }
}
