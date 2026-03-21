'use client'

import { use, useState } from 'react'
import SeriesHeader from './SeriesHeader'
import PamphletSection from './PamphletSection'
import VariantsSection from './VariantsSection'
import SaveBar from './SaveBar'

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

export default function SeriesPage({
    params,
}: {
    params: Promise<{ barcode: string }>
}) {
    const { barcode } = use(params)

    // TODO: fetch series and images, set these states
    const series: SeriesData | null = null
    const images: PamphletImage[] = []
    const loadingSeries = false
    const loadingImages = false
    const token: string | null = null

    const [imageIndex, setImageIndex] = useState(0)
    const [owned, setOwned] = useState<Set<string>>(new Set())
    const [saved, setSaved] = useState<Set<string>>(new Set())
    const [isSaving, setIsSaving] = useState(false)

    const hasUnsavedChanges = (() => {
        if (owned.size !== saved.size) return true
        for (const id of owned) if (!saved.has(id)) return true
        return false
    })()

    function toggleVariant(id: string) {
        if (!token) return // TODO: open sign-in
        setOwned(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    async function handleSave() {
        if (!hasUnsavedChanges || isSaving || !token) return
        setIsSaving(true)
        // TODO: call collection API (PUT / DELETE for each changed variant)
        setSaved(new Set(owned))
        setIsSaving(false)
    }

    function handleReport(fileName: string) {
        if (!token) return // TODO: open sign-in
        // TODO: PUT /api/v1/series/${barcode}/pamphlets/front/${fileName}/flags
    }

    function handleUpvote(_fileName: string) {
        if (!token) return // TODO: open sign-in
        // TODO: upvote endpoint TBD
    }

    return (
        <div className="max-w-[480px] mx-auto pb-12">

            <div className="pt-5 pb-4 px-5 border-b border-edge">
                <SeriesHeader loading={loadingSeries} barcode={barcode} series={series} />
            </div>

            <PamphletSection
                loading={loadingImages}
                barcode={barcode}
                images={images}
                imageIndex={imageIndex}
                onIndexChange={setImageIndex}
                onReport={handleReport}
                onUpvote={handleUpvote}
            />

            <VariantsSection
                loading={loadingSeries}
                barcode={barcode}
                variants={series?.variants ?? []}
                owned={owned}
                onToggle={toggleVariant}
            />

            <SaveBar
                hasUnsavedChanges={hasUnsavedChanges}
                isSaving={isSaving}
                onSave={handleSave}
            />

        </div>
    )
}
