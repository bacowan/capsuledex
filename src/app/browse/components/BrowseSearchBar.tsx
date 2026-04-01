export default function BrowseSearchBar() {
  return (
    <div className="px-4 md:px-6 py-3 border-b border-edge-subtle">
      <div className="flex items-center gap-2">
        <div className="flex items-center flex-1 border border-edge rounded-xl overflow-hidden bg-subtle h-9">
          <div className="px-2.5 border-r border-edge-subtle h-full flex items-center text-fg-muted shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
              <line x1="9.5" y1="9.5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          {/* TODO: filter series list on input */}
          <input
            type="text"
            placeholder="Search series, brands or collectors…"
            className="flex-1 px-3 text-sm text-fg outline-none placeholder:text-fg-muted bg-transparent h-full"
          />
        </div>
        <button className="h-9 px-4 rounded-xl bg-brand text-white text-sm font-medium shrink-0 hover:bg-brand-hover cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
}
