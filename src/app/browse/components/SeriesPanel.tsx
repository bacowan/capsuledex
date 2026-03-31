import SeriesRow from "@/app/components/SeriesRow";

const brandChips = ["All", "Kitan Club", "Bandai", "Re-ment", "Epoch", "Qualia"];

const seriesList = [
  { coverBg: "#E1F5EE", emoji: "🐧", name: "Penguin Parade Vol.3", brand: "Qualia",     variantCount: 5, isNew: true  },
  { coverBg: "#FBEAF0", emoji: "🐱", name: "Cat on Cup",           brand: "Kitan Club", variantCount: 8, isNew: false },
  { coverBg: "#E6F1FB", emoji: "🦆", name: "Yell Duck",            brand: "Bandai",     variantCount: 6, isNew: false },
  { coverBg: "#EAF3DE", emoji: "🍄", name: "Mushroom Forest",      brand: "Epoch",      variantCount: 5, isNew: false },
  { coverBg: "#FAEEDA", emoji: "🐸", name: "Frog Café Vol.2",      brand: "Re-ment",    variantCount: 7, isNew: false },
  { coverBg: "#EEEDFE", emoji: "🌸", name: "Sakura Spirits",       brand: "Qualia",     variantCount: 4, isNew: false },
];

export default function SeriesPanel() {
  return (
    <div>
      {/* Filter / sort bar */}
      <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-edge-subtle">
        {/* TODO: filter series by brand on chip select */}
        <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
          {brandChips.map((chip, i) => (
            i === 0 ? (
              <button key={chip} className="shrink-0 px-3 py-1 border border-edge-accent rounded-full text-xs bg-accent-surface text-fg-accent cursor-pointer whitespace-nowrap">
                {chip}
              </button>
            ) : (
              <button key={chip} className="shrink-0 px-3 py-1 border border-edge rounded-full text-xs bg-transparent text-fg-secondary cursor-pointer whitespace-nowrap hover:bg-subtle">
                {chip}
              </button>
            )
          ))}
        </div>

        {/* TODO: sort series list on change */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-fg-muted">Sort:</span>
          <select className="text-xs text-fg border border-edge rounded-lg px-1.5 py-1 bg-surface outline-none cursor-pointer">
            <option>Recently added</option>
            <option>Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Series list */}
      <div className="flex flex-col md:px-6">
        {seriesList.map((s) => (
          <SeriesRow
            key={s.name}
            coverBg={s.coverBg}
            emoji={s.emoji}
            name={s.name}
            brand={s.brand}
            variantCount={s.variantCount}
            isNew={s.isNew}
          />
        ))}
      </div>

      {/* Empty state */}
      <div className="hidden py-16 flex flex-col items-center gap-2 text-center">
        {/* TODO: show this when filtered list is empty */}
        <div className="text-3xl">🔍</div>
        <div className="text-sm font-medium text-fg">No series found</div>
        <div className="text-xs text-fg-muted">Try a different brand or search term</div>
      </div>
    </div>
  );
}
