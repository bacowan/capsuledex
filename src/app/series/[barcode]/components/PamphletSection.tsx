import Link from 'next/link'
import { Flag, ThumbsUp } from 'react-feather'

type PamphletImage = {
    'is-front': boolean
    url: string
    'file-name': string
}

type Props = {
    loading: boolean
    barcode: string
    images: PamphletImage[]
    imageIndex: number
    onIndexChange: (i: number) => void
    onReport: (fileName: string) => void
    onUpvote: (fileName: string) => void
}

export default function PamphletSection({
    loading,
    barcode,
    images,
    imageIndex,
    onIndexChange,
    onReport,
    onUpvote,
}: Props) {
    const current = images[imageIndex]

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

            {/* Loading */}
            {loading && (
                <div className="aspect-video rounded-[10px] bg-subtle animate-pulse" />
            )}

            {/* No images */}
            {!loading && images.length === 0 && (
                <div className="aspect-video rounded-[10px] border border-edge bg-subtle flex items-center justify-center">
                    <span className="text-fg-muted text-sm">No images yet</span>
                </div>
            )}

            {/* Carousel */}
            {!loading && images.length > 0 && (
                <>
                    <div className="relative rounded-[10px] border border-edge overflow-hidden aspect-video">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={current.url}
                            alt="Pamphlet"
                            className="w-full h-full object-cover"
                        />

                        {/* Report */}
                        <button
                            onClick={() => onReport(current['file-name'])}
                            className="absolute top-2 right-2 w-[26px] h-[26px] rounded-[6px] bg-surface border border-edge flex items-center justify-center text-fg-muted hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        >
                            <Flag size={12} />
                        </button>

                        {/* Upvote */}
                        <button
                            onClick={() => onUpvote(current['file-name'])}
                            className="absolute bottom-2 right-2 bg-surface border border-edge rounded-full px-2.5 py-1 text-[12px] font-medium flex items-center gap-1.5 text-fg"
                        >
                            <ThumbsUp size={12} />
                            <span>0</span>
                        </button>
                    </div>

                    {/* Dots */}
                    {images.length > 1 && (
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => onIndexChange(i)}
                                    className={`w-[5px] h-[5px] rounded-full transition-colors ${
                                        i === imageIndex ? 'bg-brand' : 'bg-edge'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
