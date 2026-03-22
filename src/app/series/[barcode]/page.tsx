import SeriesHeader from './components/SeriesHeader'
import PamphletSection from './components/PamphletSection'
import VariantsSection from './components/VariantsSection'
import SaveBar from './components/SaveBar'
import { getSeries, SeriesResponse } from '@/services/series'
import { NotFoundError } from '@/services/errors'
import { notFound } from 'next/navigation'
import SeriesClientPage from './clientPage'
import { Suspense } from 'react'
import { getPamphletUrl } from '@/lib/supabaseStorage'

type Variant = { id: string; name: string }

type SeriesData = {
    barcode: string
    name: string | null
    line: string | null
    brand: { id: string; name: string }
    variants: Variant[]
}

type PamphletImage = {
    'is-front': boolean
    url: string
    'file-name': string
}

export default async function SeriesPage({
    params,
}: {
    params: Promise<{ barcode: string }>
}) {
    const { barcode } = await params

    let series: SeriesResponse
    try {
        series = await getSeries(barcode)
    }
    catch (error) {
        if (error instanceof NotFoundError) {
            notFound()
        }
        else {
            throw error
        }
    }

    

    return <Suspense>
        <SeriesClientPage series={series} collection={null}/>
    </Suspense>
}
