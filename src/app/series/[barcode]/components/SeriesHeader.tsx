import Link from 'next/link'

type Props = {
    barcode: string
    name: string | null
    line: string | null
    brand: {
        id: string
        name: string
    }
}

export default function SeriesHeader({ barcode, name, line , brand }: Props) {
    return (
        <>
            <Link
                href={`/brands/${brand.id}`}
                className="inline-block bg-accent-surface text-fg-accent-secondary text-[10px] font-medium px-2.5 py-0.5 rounded-full mb-2"
            >
                {brand.name}
            </Link>
            <h1 className="text-[22px] sm:text-[28px] font-medium tracking-tight leading-tight text-fg mb-1.5">
                {name ?? line ?? '[Series Name Unknown]'}
            </h1>
            <p className="font-mono text-[12px] text-fg-secondary tracking-wider">
                {barcode}
            </p>
        </>
    )
}
