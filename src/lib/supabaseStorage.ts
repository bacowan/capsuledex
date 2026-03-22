import 'server-only'
import supabase from './supabase'

export const getPamphletPath = (barcode: string, filename: string, side: "front" | "back") => {
    return `series/${barcode}/pamphlets/${side}/${filename}`
}

export const getPamphletUrl = (barcode: string, filename: string, side: "front" | "back") => {
    const path = getPamphletPath(barcode, filename, side)
    return supabase.storage.from('public_images').getPublicUrl(path).data.publicUrl
}