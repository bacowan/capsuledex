"use client"

import { CapsuleData } from "../ScannerSheet"

type Props = {
  result: CapsuleData
  onConfirm: () => void
  onScanAnother: () => void
}

export default function ScannerConfirm({ result, onConfirm, onScanAnother }: Props) {
  return (
    <section>
      <div className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative h-56">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,white_3px,white_4px)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6">
          <p className="text-white/50 text-[11px]">{result.seriesName}</p>
          <p className="text-white text-base font-medium text-center">{result.capsuleName}</p>
        </div>
      </div>
      <footer className="px-3 pb-4 pt-3">
        <h2 className="text-[13px] font-medium text-fg mb-1">Does this look right?</h2>
        <p className="text-xs text-fg-secondary mb-3">Review the details before uploading.</p>
        <button
          onClick={onConfirm}
          className="w-full py-2.5 bg-brand text-white text-sm font-medium rounded-lg mb-2 hover:bg-brand-hover transition-colors"
        >
          Confirm & upload
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
