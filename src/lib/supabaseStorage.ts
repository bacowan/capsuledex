import 'server-only'
import supabase from './supabase/jwtSupabase'

export const getSeriesImagePath = (barcode: string, filename: string, type: 'P' | 'M') => {
    return `series/${barcode}/${type}/${filename}`
}

export const getSeriesImageUrl = (barcode: string, filename: string, type: 'P' | 'M') => {
    const path = getSeriesImagePath(barcode, filename, type)
    return supabase.storage.from('public_images').getPublicUrl(path).data.publicUrl
}