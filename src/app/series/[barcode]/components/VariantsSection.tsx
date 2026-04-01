"use client"

import VariantCard from './VariantCard'
import ProgressBar from '@/components/ProgressBar'
import SectionHeader from '@/components/SectionHeader'

type Variant = { id: string; name: string }

type Props = {
    barcode: string
    variants: Variant[]
    owned: Set<string>
    onToggle: (id: string) => void
}

export default function VariantsSection({ barcode, variants, owned, onToggle }: Props) {
    const ownedCount = variants.filter(v => owned.has(v.id)).length
    const totalCount = variants.length

    return (
        <div className="py-4 px-5 sm:py-6 sm:px-8 border-b border-edge">
            <SectionHeader title="Variants" className="mb-2">
                <span className="text-[12px] text-fg-secondary">
                    {ownedCount} of {totalCount} owned
                </span>
            </SectionHeader>

            {totalCount > 0 && (
                <div className="mb-3">
                    <ProgressBar value={(ownedCount / totalCount) * 100} />
                </div>
            )}

            {/* Grid */}
            {variants.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {variants.map((v, i) => (
                        <VariantCard
                            key={v.id}
                            variant={v}
                            index={i}
                            barcode={barcode}
                            owned={owned.has(v.id)}
                            onToggle={() => onToggle(v.id)}
                        />
                    ))}
                </div>
            )}

            {variants.length === 0 && (
                <p className="text-fg-muted text-sm text-center py-4">No variants</p>
            )}
        </div>
    )
}
