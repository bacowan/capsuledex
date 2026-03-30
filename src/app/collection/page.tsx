import SeriesBlock from "@/app/collection/components/SeriesBlock";

const SERIES_DATA = [
  {
    series: "Penguin Parade Vol.3",
    brand: "Qualia",
    owned: 3,
    total: 5,
    complete: false,
    variants: [
      { name: "Emperor",    emoji: "🐧", owned: true  },
      { name: "Rockhopper", emoji: "🐧", owned: true  },
      { name: "Gentoo",     emoji: "🐧", owned: false },
      { name: "Macaroni",   emoji: "🐧", owned: true  },
      { name: "Little Blue",emoji: "🐧", owned: false },
    ],
  },
  {
    series: "Cat on Cup",
    brand: "Kitan Club",
    owned: 6,
    total: 6,
    complete: true,
    variants: [
      { name: "Tabby",  emoji: "🐱", owned: true },
      { name: "Calico", emoji: "🐱", owned: true },
      { name: "Black",  emoji: "🐱", owned: true },
      { name: "White",  emoji: "🐱", owned: true },
      { name: "Tuxedo", emoji: "🐱", owned: true },
      { name: "Orange", emoji: "🐱", owned: true },
    ],
  },
  {
    series: "Yell Duck",
    brand: "Bandai",
    owned: 2,
    total: 8,
    complete: false,
    variants: [
      { name: "Yellow",      emoji: "🦆", owned: true  },
      { name: "Pink",        emoji: "🦆", owned: false },
      { name: "Blue",        emoji: "🦆", owned: false },
      { name: "Green",       emoji: "🦆", owned: true  },
      { name: "Orange",      emoji: "🦆", owned: false },
      { name: "Secret",      emoji: "🦆", owned: false },
      { name: "Glitter",     emoji: "🦆", owned: false },
      { name: "Holographic", emoji: "🦆", owned: false },
    ],
  },
];

export default function CollectionPage() {
  return (
    <main>
      {/* Section 1 — Profile header */}
      <div className="bg-surface border-b border-edge-subtle px-5 pt-5 pb-4">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-full bg-accent-surface border border-edge-subtle flex items-center justify-center text-[22px] shrink-0">
            🌸
          </div>
          <div>
            <p className="text-base font-medium text-fg tracking-tight">yuki_collects</p>
            <p className="text-xs text-fg-secondary mt-0.5">Collection public · since 2024</p>
          </div>
        </div>
      </div>

      {/* Section 2 — Stat cards */}
      <div className="flex gap-2 px-5 py-4 bg-subtle border-b border-edge-subtle">
        {[
          { number: 47, label: "Capsules" },
          { number: 8,  label: "Series"   },
          { number: 3,  label: "Complete" },
        ].map(({ number, label }) => (
          <div key={label} className="flex-1 bg-surface border border-edge-subtle rounded-lg p-2.5 text-center">
            <p className="text-xl font-medium text-fg">{number}</p>
            <p className="text-[10px] uppercase tracking-wider text-fg-muted mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Section 3 — Series list */}
      <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        {SERIES_DATA.map((s) => (
          <SeriesBlock
            key={s.series}
            series={s.series}
            brand={s.brand}
            owned={s.owned}
            total={s.total}
            complete={s.complete}
            variants={s.variants}
          />
        ))}
      </div>
    </main>
  );
}
