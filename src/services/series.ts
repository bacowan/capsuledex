import postgres from "postgres"
import { ERROR_CODES } from "@/lib/dbConstants"
import { ConflictError, ExceededMaxPageSizeError, InvalidValueError, NotFoundError, UnprocessableError } from "./errors"
import { findSeriesByBarcode, insertSeries } from "@/repositories/series"
import { getSeriesImageUrl } from "@/lib/supabaseStorage"
import { listSeries as listSeriesRepo } from "@/repositories/series"

export type SeriesResponse = {
    barcode: string
    line: string | null
    name: string | null
    url: string | null
    'main-image': {
        filename: string,
        url: string,
        type: "M" | "P"
    } | null
    brand: { id: string; name: string; url: string | null }
    variants: { id: string; name: string }[]
}

// throws NotFoundError
export async function getSeries(barcode: string): Promise<SeriesResponse> {
    const series = await findSeriesByBarcode(barcode)
    if (!series) throw new NotFoundError()

    return {
        barcode: series.barcode,
        line: series.line,
        name: series.name,
        url: series.url,
        'main-image': series.main_image ? {
            filename: series.main_image.file_name,
            url: getSeriesImageUrl(barcode, series.main_image.file_name, series.main_image.type),
            type: series.main_image.type
        } : null,
        brand: series.brand,
        variants: series.variants ?? [],
    }
}

export type CreateSeriesResponse = {
    barcode: string
    variants: string[]
}

// throws ConflictError, UnprocessableError
export async function createSeries(
    barcode: string,
    name: string | null,
    line: string | null,
    brandId: string,
    variants: string[]
): Promise<CreateSeriesResponse> {
    try {
        return { barcode, variants: await insertSeries(barcode, name, line, brandId, variants) }
    } catch (error) {
        if (error instanceof postgres.PostgresError && error.code === ERROR_CODES.UNIQUE_VIOLATION) {
            throw new ConflictError('Series with given barcode already exists')
        }
        if (error instanceof postgres.PostgresError && error.code === ERROR_CODES.FOREIGN_KEY_VIOLATION) {
            throw new UnprocessableError('Brand with given ID does not exist')
        }
        throw error
    }
}

const MAX_SERIES_SEARCH_PAGE_SIZE = Number(process.env.MAX_SERIES_SEARCH_PAGE_SIZE ?? 20)

export type SeriesListResponse = {
    barcode: string,
    line: string | null,
    name: string | null,
    "main-image-url": string | null,
    brand: string,
    "variant-file-names": string[]
}

export async function listSeries(
    query: string | null,
    sort: "recent" | "popular" | "alphabetical",
    page: number,
    pageSize: number
): Promise<{ results: SeriesListResponse[]; total: number }> {
    if (pageSize > MAX_SERIES_SEARCH_PAGE_SIZE) {
        throw new ExceededMaxPageSizeError(`Exceeded Max Page Size of ${MAX_SERIES_SEARCH_PAGE_SIZE}`)
    }
    if (page < 0) {
        throw new InvalidValueError("Page parameter needs to be a positive number")
    }

    const results = await listSeriesRepo(query, sort, page, pageSize)
    return {
        results: results.map(r => ({
            barcode: r.barcode,
            line: r.line,
            name: r.name,
            "main-image-url": r.main_image !== null ?
                getSeriesImageUrl(
                    r.barcode,
                    r.main_image.file_name,
                    r.main_image.type) : null,
            brand: r.brand,
            "variant-file-names": r.variant_file_names
        })),
        total: results.length
    }
}