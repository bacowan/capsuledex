"use client"

import VariantCard from './VariantCard'

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
            {/* Section header */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-fg">Variants</span>
                <span className="text-[12px] text-fg-secondary">
                    {ownedCount} of {totalCount} owned
                </span>
            </div>

            {/* Progress bar */}
            {totalCount > 0 && (
                <div className="h-1 rounded-full bg-subtle mb-3 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-brand transition-all duration-300"
                        style={{ width: `${(ownedCount / totalCount) * 100}%` }}
                    />
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
