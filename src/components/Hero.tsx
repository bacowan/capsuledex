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

      <div className="flex gap-2.5 justify-center flex-wrap">
        {/* TODO: wire up barcode scanner */}
        <button className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand text-white rounded-xl text-[15px] font-medium tracking-tight hover:bg-brand-hover transition-colors">
          <div className="w-[18px] h-4 flex flex-col justify-between shrink-0">
            <div className="h-[2px] w-full bg-white/90 rounded-sm" />
            <div className="h-[2px] w-[60%] bg-white/90 rounded-sm" />
            <div className="h-[2px] w-[80%] bg-white/90 rounded-sm" />
            <div className="h-[2px] w-full bg-white/90 rounded-sm" />
          </div>
          Scan barcode
        </button>

        {/* TODO: implement random series picker */}
        <button className="inline-flex items-center gap-2 px-5 py-3 border border-edge rounded-xl text-[15px] font-medium text-fg hover:bg-subtle">
          <span className="text-base">⟳</span>
          Surprise me
        </button>
      </div>
    </section>
  );
}
