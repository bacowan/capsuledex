export default function Hero() {
  return (
    <section className="w-full bg-surface border-b border-edge pt-9 pb-7 px-6 text-center">
      <p className="text-[11px] uppercase tracking-widest text-fg-muted mb-3">
        Japanese capsule toy database
      </p>
      <h1 className="text-[28px] font-medium tracking-tight leading-tight text-fg mb-2">
        Every capsule,<br />catalogued.
      </h1>
      <p className="text-sm text-fg-secondary leading-relaxed mb-6">
        Scan a barcode to look up a series,<br />log your collection, or add what&apos;s missing.
      </p>

      {/* Mobile CTAs */}
      <div className="flex gap-2 w-full md:hidden">
        {/* TODO: open scanner sheet */}
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand text-white rounded-xl text-sm font-medium border-none hover:bg-brand-hover transition-colors">
          <div className="w-[14px] h-[11px] flex flex-col justify-between shrink-0">
            <div className="h-[2px] w-full bg-white/90 rounded-sm" />
            <div className="h-[2px] w-[60%] bg-white/90 rounded-sm" />
            <div className="h-[2px] w-[80%] bg-white/90 rounded-sm" />
            <div className="h-[2px] w-full bg-white/90 rounded-sm" />
          </div>
          Scan
        </button>
        {/* TODO: open manual entry sheet */}
        <button className="flex-1 flex items-center justify-center py-3 border border-edge rounded-xl text-sm font-medium text-fg hover:bg-subtle transition-colors">
          # Enter manually
        </button>
      </div>

      {/* Desktop barcode input */}
      <div className="hidden md:flex md:flex-col md:items-center md:gap-2">
        <div className="flex gap-2 items-center w-full max-w-[340px]">
          <div className="flex-1 flex items-center border border-edge rounded-xl overflow-hidden bg-surface">
            {/* Barcode icon prefix */}
            <div className="px-3 border-r border-edge h-[38px] flex items-center text-fg-muted shrink-0">
              <div className="w-[14px] h-[11px] flex flex-col justify-between">
                <div className="h-[2px] w-full bg-current rounded-sm" />
                <div className="h-[2px] w-[60%] bg-current rounded-sm" />
                <div className="h-[2px] w-[80%] bg-current rounded-sm" />
                <div className="h-[2px] w-full bg-current rounded-sm" />
              </div>
            </div>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter barcode number…"
              className="flex-1 px-3 text-sm text-fg outline-none placeholder:text-fg-muted bg-transparent h-[38px]"
            />
          </div>
          {/* TODO: handle lookup */}
          <button className="px-4 h-[38px] bg-brand text-white text-sm font-medium rounded-xl shrink-0 hover:bg-brand-hover transition-colors">
            Look up
          </button>
        </div>

        {/* Use camera link */}
        <div className="flex items-center gap-1 text-[11px] text-fg-muted">
          {/* TODO: open scanner sheet */}
          <button className="flex items-center gap-1 bg-transparent border-none text-[11px] text-fg-muted hover:text-fg-secondary p-0">
            <div className="w-[11px] h-[11px] rounded-full border-[1.5px] border-current flex items-center justify-center">
              <div className="w-[3px] h-[3px] bg-current rounded-full ml-px" />
            </div>
            Use camera
          </button>
        </div>
      </div>
    </section>
  );
}
