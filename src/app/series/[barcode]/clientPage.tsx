"use client"

import { SeriesResponse } from "@/services/series"
import SeriesHeader from "./components/SeriesHeader"
import PamphletSection from "./components/PamphletSection"
import VariantsSection from "./components/VariantsSection"
import SaveBar from "./components/SaveBar"
import { useState } from "react"

interface Props {
    series: SeriesResponse,
    collection: string[] | null
}

export default function SeriesClientPage({ series }: Props) {
    const [selectedVariants, setSelectedVariants] = useState<Set<string>>(new Set<string>())
    const [isSaving, setIsSaving] = useState(false)

    const hasUnsavedChanges = false

    const toggleVariant = (variantId: string) => {}
    const handleSave = () => {}

    return (
        <div className="max-w-[480px] sm:max-w-2xl mx-auto pb-12">

            <div className="pt-5 pb-4 px-5 sm:pt-8 sm:pb-6 sm:px-8 border-b border-edge">
                <SeriesHeader barcode={series.barcode} name={series.name} line={series.line} brand={series.brand} />
            </div>

            <PamphletSection
                barcode={series.barcode}
                pamphlet={series["main-pamphlet"]}
            />

            <VariantsSection
                barcode={series.barcode}
                variants={series.variants}
                owned={selectedVariants}
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