const feedItems = [
  { emoji: "🐧", name: "Penguin Parade Vol.3", meta: "Qualia · 5 variants · 2 min ago", badge: true },
  { emoji: "🌙", name: "Moonlight Cats", meta: "Kitan Club · 6 variants · 14 min ago", badge: true },
  { emoji: "🦊", name: "Forest Friends", meta: "Bandai · 8 variants · 1 hr ago", badge: false },
  { emoji: "🍡", name: "Dango Wagashi", meta: "Re-ment · 4 variants · 3 hr ago", badge: false },
  { emoji: "🐼", name: "Panda Picnic", meta: "Epoch · 6 variants · 5 hr ago", badge: false },
];

export default function RecentFeed() {
  return (
    <section className="px-5 pt-6">
      <div className="flex items-baseline justify-between mb-3.5">
        <span className="text-[13px] font-medium text-fg">Recently added</span>
        {/* TODO: link to /browse */}
        <button className="text-[12px] text-fg-secondary hover:text-fg">
          Browse all →
        </button>
      </div>

      <ul>
        {feedItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-3 py-2.5 border-b border-edge-subtle last:border-b-0"
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-base border border-edge-subtle bg-subtle shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-fg truncate">{item.name}</p>
              <p className="text-[11px] text-fg-muted mt-0.5">{item.meta}</p>
            </div>
            {item.badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-surface text-fg-accent-secondary font-medium shrink-0">
                New
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
