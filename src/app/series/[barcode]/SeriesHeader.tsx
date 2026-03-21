import Link from 'next/link'

type Props = {
    loading: boolean
    barcode: string
    series: {
        name: string | null
        line: string | null
        brand: { id: string; name: string }
    } | null
}

export default function SeriesHeader({ loading, barcode, series }: Props) {
    if (loading) {
        return (
            <div className="animate-pulse space-y-2">
                <div className="h-4 w-16 bg-subtle rounded-full" />
                <div className="h-7 w-48 bg-subtle rounded" />
                <div className="h-3 w-32 bg-subtle rounded" />
            </div>
        )
    }

    if (!series) {
        return <p className="text-fg-muted text-sm">Series not found</p>
    }

    return (
        <>
            <Link
                href={`/brands/${series.brand.id}`}
                className="inline-block bg-accent-surface text-fg-accent-secondary text-[10px] font-medium px-2.5 py-0.5 rounded-full mb-2"
            >
                {series.brand.name}
            </Link>
            <h1 className="text-[22px] font-medium tracking-tight leading-tight text-fg mb-1.5">
                {series.name ?? series.line ?? 'Untitled Series'}
            </h1>
            <p className="font-mono text-[12px] text-fg-secondary tracking-wider">
                {barcode}
            </p>
        </>
    )
}
