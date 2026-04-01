import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";

const collectors = [
  { bg: "#FBEAF0", emoji: "🌸", label: "yuki" },
  { bg: "#E6F1FB", emoji: "🐸", label: "capsule_ken" },
  { bg: "#EAF3DE", emoji: "🐼", label: "gashapon" },
  { bg: "#EEEDFE", emoji: "🦋", label: "Meg" },
  { bg: "#FAEEDA", emoji: "🍜", label: "tokyo99" },
];

export default function CollectorsSection() {
  return (
    <div className="px-4 pt-4 pb-6 bg-surface">
      {/* Section header */}
      {/* TODO: navigate to collectors list */}
      <SectionHeader title="12 collectors own this" className="mb-3">
        <Button variant="ghost" className="text-xs cursor-pointer">
          See all
        </Button>
      </SectionHeader>

      {/* Avatar row */}
      <div className="flex gap-2 flex-wrap">
        {collectors.map((collector) => (
          <div key={collector.label} className="flex flex-col items-center gap-1">
            <div
              className="w-9 h-9 rounded-full border border-edge-subtle flex items-center justify-center text-base"
              style={{ backgroundColor: collector.bg }}
            >
              {collector.emoji}
            </div>
            <span className="text-[10px] text-fg-muted max-w-[44px] text-center truncate">
              {collector.label}
            </span>
          </div>
        ))}

        {/* Overflow pill */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-subtle border border-edge-subtle flex items-center justify-center">
            <span className="text-[11px] font-medium text-fg-secondary">+7</span>
          </div>
          <span className="text-[10px] text-fg-muted max-w-[44px] text-center truncate">
            more
          </span>
        </div>
      </div>
    </div>
  );
}
