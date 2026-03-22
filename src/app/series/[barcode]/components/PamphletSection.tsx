import Link from 'next/link'
import { Flag } from 'react-feather'

type PamphletImage = {
    url: string
    filename: string
}

type Props = {
    barcode: string
    pamphlet: PamphletImage | null
}

export default function PamphletSection({ barcode, pamphlet }: Props) {
    const onReport = (filename: string) => {}

    return (
        <div className="py-4 px-5 sm:py-6 sm:px-8 border-b border-edge">
            {/* Section header */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium text-fg-secondary uppercase tracking-widest">
                    Pamphlet
                </span>
                <div className="flex items-center">
                    <Link
                        href={`/series/${barcode}/pamphlets`}
                        className="text-[11px] text-fg-muted hover:text-fg-secondary"
                    >
                        Browse all
                    </Link>
                    <span className="text-[11px] text-neutral-300 mx-1.5 select-none">·</span>
                    <button className="text-[11px] text-brand hover:text-brand-hover">
                        Add photo
                    </button>
                </div>
            </div>

            {/* No image */}
            {!pamphlet && (
                <div className="aspect-video rounded-[10px] border border-edge bg-subtle flex items-center justify-center">
                    <span className="text-fg-muted text-sm">No images yet</span>
                </div>
            )}

            {/* Image */}
            {pamphlet && (
                <div className="relative rounded-[10px] border border-edge overflow-hidden aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={pamphlet.url}
                        alt="Pamphlet"
                        className="w-full h-full object-cover"
                    />

                    {/* Report */}
                    <button
                        onClick={() => onReport(pamphlet.filename)}
                        className="absolute top-2 right-2 w-[26px] h-[26px] rounded-[6px] bg-surface border border-edge flex items-center justify-center text-fg-muted hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                        <Flag size={12} />
                    </button>

                </div>
            )}
        </div>
    )
}
