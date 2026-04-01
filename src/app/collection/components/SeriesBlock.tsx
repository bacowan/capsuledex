import VariantCard from "./VariantCard";
import Badge from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";

type Variant = {
  name: string;
  emoji: string;
  owned: boolean;
};

type SeriesBlockProps = {
  series: string;
  brand: string;
  owned: number;
  total: number;
  complete: boolean;
  variants: Variant[];
};

export default function SeriesBlock({ series, brand, owned, total, complete, variants }: SeriesBlockProps) {
  const progressPct = Math.round((owned / total) * 100);

  return (
    <div className="bg-surface border border-edge rounded-xl overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-edge-subtle">
        {/* Left — series name + brand */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-fg">{series}</p>
          <p className="text-[11px] text-fg-muted mt-0.5">{brand}</p>
        </div>

        {/* Right — badge / progress, optional scroll hint, divider, pamphlet button */}
        <div className="flex items-center gap-2 shrink-0">
          {complete ? (
            <Badge variant="success">Complete</Badge>
          ) : (
            <>
              <span className="text-xs text-fg-secondary">
                {owned}/{total}
              </span>
              <div className="w-12">
                <ProgressBar value={progressPct} />
              </div>
            </>
          )}

          {/* Thin vertical divider */}
          <div className="w-px h-3.5 bg-edge" />

          {/* Pamphlet upload button */}
          {/* TODO: open pamphlet upload sheet */}
          <button className="flex items-center gap-1 text-[11px] text-fg-muted hover:text-fg-secondary bg-transparent border-none cursor-pointer p-0">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="10" height="8" rx="1" />
              <path d="M4 3V2.5C4 1.9 4.4 1.5 5 1.5H7C7.6 1.5 8 1.9 8 2.5V3" />
              <circle cx="6" cy="7" r="1.5" />
            </svg>
            <span>Pamphlet</span>
          </button>
        </div>
      </div>

      {/* Variant scroll row */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3.5 py-3">
        {variants.map((v) => (
          <VariantCard key={v.name} name={v.name} emoji={v.emoji} owned={v.owned} />
        ))}
        <div className="w-1 shrink-0" />
      </div>
    </div>
  );
}
