import Badge from "@/components/Badge"

interface SeriesRowProps {
  coverBg: string;
  emoji: string;
  name: string;
  brand: string;
  variantCount: number;
  isNew?: boolean;
}

export default function SeriesRow({ coverBg, emoji, name, brand, variantCount, isNew }: SeriesRowProps) {
  return (
    // TODO: navigate to /series/[barcode] on click
    <div className="flex items-center gap-3 md:gap-4 px-4 md:px-0 py-3 border-b border-edge-subtle last:border-b-0 cursor-pointer hover:bg-subtle transition-colors">
      {/* Cover thumbnail */}
      <div
        className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-xl border border-edge-subtle flex items-center justify-center text-3xl"
        style={{ backgroundColor: coverBg }}
      >
        {emoji}
      </div>

      {/* Info block */}
      <div className="flex-1 min-w-0">
        {/* Mobile title row */}
        <div className="flex flex-col gap-0.5 mb-1.5 md:hidden">
          <span className="text-[13px] font-medium text-fg">{name}</span>
          <span className="text-[11px] text-fg-muted">{brand} · {variantCount} variants</span>
          {isNew && (
            <Badge>New</Badge>
          )}
        </div>

        {/* Desktop title row */}
        <div className="hidden md:flex md:items-baseline md:gap-2 md:mb-2">
          <span className="text-sm font-medium text-fg">{name}</span>
          <span className="text-[11px] text-fg-muted">{brand}</span>
          {isNew && (
            <Badge>New</Badge>
          )}
        </div>

        {/* Variant preview chips */}
        <div className="flex gap-1 overflow-hidden">
          {Array.from({ length: variantCount }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 md:w-7 md:h-7 rounded-md border border-edge-subtle flex items-center justify-center text-xs md:text-sm shrink-0"
              style={{ backgroundColor: coverBg }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Variant count — desktop only */}
      <div className="hidden md:block text-xs text-fg-muted shrink-0">{variantCount} variants</div>
    </div>
  );
}
