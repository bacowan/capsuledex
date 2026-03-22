import { getSeries, SeriesResponse } from '@/services/series'
import { NotFoundError } from '@/services/errors'
import { notFound } from 'next/navigation'
import SeriesClientPage from './clientPage'

export default async function SeriesPage({
    params,
}: {
    params: Promise<{ barcode: string }>
}) {
    const { barcode } = await params

    let series: SeriesResponse
    try {
        series = await getSeries(barcode)
    } catch (error) {
        if (error instanceof NotFoundError) notFound()
        else throw error
    }

    return <SeriesClientPage series={series!} collection={null} />
}
