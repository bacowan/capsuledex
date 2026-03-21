import postgres from "postgres"
import { ERROR_CODES } from "@/lib/dbConstants"
import { ConflictError, NotFoundError, UnprocessableError } from "./errors"
import { findSeriesByBarcode, insertSeries } from "@/repositories/series"

export type SeriesResponse = {
    barcode: string
    line: string | null
    name: string | null
    url: string | null
    'pamphlet-front-id': string | null
    'pamphlet-back-id': string | null
    brand: { id: string; name: string; url: string | null }
    variants: { id: number; name: string }[]
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
        'pamphlet-front-id': series.pamphlet_front_id,
        'pamphlet-back-id': series.pamphlet_back_id,
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
