import Link from 'next/link'
import { Image, Check, ExternalLink } from 'react-feather'

type Props = {
    variant: { id: string; name: string }
    index: number
    barcode: string
    owned: boolean
    onToggle: () => void
}

export default function VariantCard({ variant, index, barcode, owned, onToggle }: Props) {
    return (
        <div
            onClick={onToggle}
            className={`relative border rounded-[10px] overflow-hidden cursor-pointer ${
                owned
                    ? 'bg-accent-surface border-edge-accent'
                    : 'bg-subtle border-edge'
            }`}
        >
            {/* Image area */}
            <div className={`aspect-square flex items-center justify-center ${
                owned ? 'bg-brand-ring' : 'bg-subtle'
            }`}>
                <span className="text-neutral-300">
                    <Image size={24} />
                </span>
            </div>

            {/* Owned badge */}
            {owned && (
                <div className="absolute top-1.5 left-1.5 w-[18px] h-[18px] rounded-full bg-brand flex items-center justify-center">
                    <Check size={10} color="white" strokeWidth={3} />
                </div>
            )}

            {/* Footer */}
            <div className={`border-t px-2 py-1.5 flex items-center justify-between ${
                owned ? 'border-edge-accent' : 'border-edge'
            }`}>
                <div className="min-w-0 flex-1 mr-1">
                    <p className={`text-[10px] font-medium leading-none mb-0.5 ${
                        owned ? 'text-pink-400' : 'text-fg-muted'
                    }`}>
                        #{index + 1}
                    </p>
                    <p className={`text-[11px] truncate leading-tight ${
                        owned ? 'text-fg-accent' : 'text-fg-secondary'
                    }`}>
                        {variant.name}
                    </p>
                </div>

                <Link
                    href={`/series/${barcode}/variants/${variant.id}`}
                    onClick={e => e.stopPropagation()}
                    className={`flex-shrink-0 w-[24px] h-[24px] rounded-[5px] border flex items-center justify-center ${
                        owned
                            ? 'bg-brand-ring border-edge-accent text-brand hover:bg-accent-surface'
                            : 'bg-subtle border-edge text-fg-muted hover:bg-surface hover:text-fg'
                    }`}
                >
                    <ExternalLink size={13} />
                </Link>
            </div>
        </div>
    )
}
