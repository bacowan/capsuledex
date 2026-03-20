export default function RandomReveal() {
  return (
    <div className="mx-5 mt-5 border border-edge-accent rounded-xl overflow-hidden">
      <div className="flex items-center px-3.5 py-2.5 bg-accent-surface border-b border-edge-accent">
        <span className="text-[11px] uppercase tracking-wider font-medium text-fg-accent">
          Random pick
        </span>
      </div>

      <div className="flex items-center gap-4 p-4">
        <div className="w-[72px] h-[72px] rounded-lg border border-edge-subtle bg-accent-surface flex items-center justify-center text-4xl shrink-0">
          🌸
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-fg-muted mb-1">Qualia</p>
          <p className="text-base font-medium text-fg tracking-tight mb-1">Sakura Spirits</p>
          <p className="text-xs text-fg-secondary">4 variants</p>
        </div>
      </div>

      <div className="flex gap-2 px-4 pb-3.5">
        {/* TODO: link to series page */}
        <button className="flex-1 py-2 bg-brand text-white text-[13px] font-medium rounded-lg text-center hover:bg-brand-hover transition-colors">
          View series
        </button>
      </div>
    </div>
  );
}
