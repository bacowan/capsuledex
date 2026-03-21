"use client"

type Props = {
  onAddCapsule: () => void
  onScanAnother: () => void
}

export default function ScannerNotFound({ onAddCapsule, onScanAnother }: Props) {
  return (
    <section>
      <div className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative h-56 opacity-60">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,white_3px,white_4px)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-24 relative">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/20 rounded-tl" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/20 rounded-tr" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/20 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/20 rounded-br" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl text-white/60">?</div>
          </div>
        </div>
      </div>
      <footer className="px-3 pb-4 pt-3">
        <h2 className="text-[13px] font-medium text-fg mb-1">Not in the database yet</h2>
        <p className="text-xs text-fg-secondary mb-3">Be the first to add this capsule.</p>
        <button
          onClick={onAddCapsule}
          className="w-full py-2.5 bg-brand text-white text-sm font-medium rounded-lg mb-2 hover:bg-brand-hover transition-colors"
        >
          Add capsule
        </button>
        <button
          onClick={onScanAnother}
          className="w-full py-2 border border-edge rounded-lg text-xs text-fg-secondary hover:bg-subtle transition-colors"
        >
          Scan another
        </button>
      </footer>
    </section>
  )
}
