import sql from "@/lib/db"
import supabase from "@/lib/supabase"
import sharp from "sharp"
import { NotFoundError } from "./errors"
import { findPamphletsByBarcode, upsertPamphlet } from "@/repositories/pamphlets"
import { getPamphletPath } from "@/lib/supabaseStorage"

export type PamphletResponse = {
    'is-front': boolean
    url: string
    'file-name': string
}

// throws NotFoundError
export async function getPamphlets(barcode: string): Promise<PamphletResponse[]> {
    const pamphlets = await findPamphletsByBarcode(barcode)
    if (!pamphlets) throw new NotFoundError()

    return pamphlets.map(p => {
        const path = `series/${barcode}/pamphlets/${p.is_front ? 'front' : 'back'}/${p.file_name}`
        return {
            'is-front': p.is_front,
            url: supabase.storage.from('public_images').getPublicUrl(path).data.publicUrl,
            'file-name': p.file_name,
        }
    })
}

// throws NotFoundError
export async function uploadPamphlet(
    barcode: string,
    side: 'front' | 'back',
    imageBuffer: ArrayBuffer,
    contentType: string,
    user: { id: string },
): Promise<{ url: string }> {
    const stripped = await sharp(Buffer.from(imageBuffer)).toBuffer()
    const newFileName = `${crypto.randomUUID()}.${contentType.slice('image/'.length)}`

    const url = await sql.begin(async _tx => {
        const found = await upsertPamphlet(barcode, newFileName, side === 'front', user.id)
        if (!found) throw new NotFoundError()

        const path = getPamphletPath(barcode, newFileName, side)
        const { error: uploadError } = await supabase.storage
            .from('public_images')
            .upload(path, stripped, { upsert: true })
        if (uploadError) throw uploadError

        return supabase.storage.from('public_images').getPublicUrl(path).data.publicUrl
    })

    return { url }
}
