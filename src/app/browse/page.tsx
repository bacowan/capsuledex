import SeriesRow from "@/app/components/SeriesRow";
import CollectorRow from "@/app/components/CollectorRow";

const seriesList = [
  { coverBg: "#E1F5EE", emoji: "🐧", name: "Penguin Parade Vol.3", brand: "Qualia",     variantCount: 5, isNew: true  },
  { coverBg: "#FBEAF0", emoji: "🐱", name: "Cat on Cup",           brand: "Kitan Club", variantCount: 8, isNew: false },
  { coverBg: "#E6F1FB", emoji: "🦆", name: "Yell Duck",            brand: "Bandai",     variantCount: 6, isNew: false },
  { coverBg: "#EAF3DE", emoji: "🍄", name: "Mushroom Forest",      brand: "Epoch",      variantCount: 5, isNew: false },
  { coverBg: "#FAEEDA", emoji: "🐸", name: "Frog Café Vol.2",      brand: "Re-ment",    variantCount: 7, isNew: false },
  { coverBg: "#EEEDFE", emoji: "🌸", name: "Sakura Spirits",       brand: "Qualia",     variantCount: 4, isNew: false },
];

const collectorList = [
  { avatarBg: "#FBEAF0", avatarEmoji: "🌸", username: "yuki_collects",    capsules: 47,  series: 8,  complete: 3,  previewEmojis: ["🐧", "🐱", "🦆"] },
  { avatarBg: "#E6F1FB", avatarEmoji: "🐸", username: "capsule_ken",      capsules: 112, series: 19, complete: 11, previewEmojis: ["🍄", "🌙", "🦊"] },
  { avatarBg: "#EAF3DE", avatarEmoji: "🐼", username: "gashapon_hoarder", capsules: 89,  series: 14, complete: 7,  previewEmojis: ["🐧", "🍡", "🌸"] },
  { avatarBg: "#EEEDFE", avatarEmoji: "🦋", username: "miniFigureMeg",    capsules: 63,  series: 10, complete: 4,  previewEmojis: ["🐱", "🦆", "🐸"] },
  { avatarBg: "#FAEEDA", avatarEmoji: "🍜", username: "tokyoToys99",      capsules: 201, series: 31, complete: 18, previewEmojis: ["🦊", "🐼", "🍄"] },
];

const brandChips = ["All", "Kitan Club", "Bandai", "Re-ment", "Epoch", "Qualia"];

export default function BrowsePage() {
  return (
    <main>
      <div className="max-w-[900px] mx-auto">
        {/* Search bar */}
        <div className="px-4 md:px-6 py-3 border-b border-edge-subtle">
          <div className="flex items-center border border-edge rounded-xl overflow-hidden bg-subtle h-9">
            {/* Search icon */}
            <div className="px-2.5 border-r border-edge-subtle h-full flex items-center text-fg-muted shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <line x1="9.5" y1="9.5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            {/* TODO: filter series list on input */}
            <input
              type="text"
              placeholder="Search series or brands…"
              className="flex-1 px-3 text-sm text-fg outline-none placeholder:text-fg-muted bg-transparent h-full"
            />
          </div>
        </div>

        {/* Tabs */}
        {/* TODO: toggle active tab with useState */}
        <div className="flex border-b border-edge-subtle px-4 md:px-6">
          <button className="flex-1 md:flex-none md:mr-5 py-2.5 text-sm font-medium text-fg border-b-2 border-pink-500 bg-transparent border-x-0 border-t-0 cursor-pointer">
            Series
          </button>
          <button className="flex-1 md:flex-none md:mr-5 py-2.5 text-sm text-fg-secondary border-b-2 border-transparent bg-transparent border-x-0 border-t-0 cursor-pointer hover:text-fg">
            Collectors
          </button>
        </div>

        {/* Series panel */}
        <div>
          {/* Filter / sort bar */}
          <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-edge-subtle">
            {/* Brand filter chips */}
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

            {/* Sort control */}
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

        {/* Collectors panel */}
        {/* TODO: show when Collectors tab is active */}
        <div className="hidden flex flex-col gap-2 px-4 md:px-6 py-3">
          {collectorList.map((c) => (
            <CollectorRow
              key={c.username}
              avatarBg={c.avatarBg}
              avatarEmoji={c.avatarEmoji}
              username={c.username}
              capsules={c.capsules}
              series={c.series}
              complete={c.complete}
              previewEmojis={c.previewEmojis}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
