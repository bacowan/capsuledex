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
    <div className="px-4 pt-4 pb-6 bg-white">
      {/* Section header */}
      {/* TODO: navigate to collectors list */}
      <SectionHeader title="12 collectors own this" className="mb-3">
        <button className="text-xs text-neutral-500 bg-transparent border-none cursor-pointer hover:text-neutral-700 p-0">
          See all
        </button>
      </SectionHeader>

      {/* Avatar row */}
      <div className="flex gap-2 flex-wrap">
        {collectors.map((collector) => (
          <div key={collector.label} className="flex flex-col items-center gap-1">
            <div
              className="w-9 h-9 rounded-full border border-neutral-100 flex items-center justify-center text-base"
              style={{ backgroundColor: collector.bg }}
            >
              {collector.emoji}
            </div>
            <span className="text-[10px] text-neutral-400 max-w-[44px] text-center truncate">
              {collector.label}
            </span>
          </div>
        ))}

        {/* Overflow pill */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-100 flex items-center justify-center">
            <span className="text-[11px] font-medium text-neutral-500">+7</span>
          </div>
          <span className="text-[10px] text-neutral-400 max-w-[44px] text-center truncate">
            more
          </span>
        </div>
      </div>
    </div>
  );
}
