"use client"

type Props = {
  onManualEntry: () => void
}

export default function ScannerNoPermissions({ onManualEntry }: Props) {
  return (
    <section>
      <div className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative h-56">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">🚫</div>
          <p className="text-white text-[13px] font-medium">Camera access required</p>
          <p className="text-white/50 text-[11px]">Allow camera access in your browser settings, then reopen the scanner.</p>
        </div>
      </div>
      <footer className="px-3 pb-4 pt-2">
        <button
          onClick={onManualEntry}
          className="w-full py-2 border border-edge rounded-lg text-xs text-fg-secondary hover:bg-subtle transition-colors text-center"
        >
          Enter barcode manually
        </button>
      </footer>
    </section>
  )
}
