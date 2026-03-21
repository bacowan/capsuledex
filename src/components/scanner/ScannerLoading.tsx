"use client"

import { useEffect } from "react"
import { CapsuleData } from "../ScannerSheet"

type Props = {
  imageData: string
  onComplete: (result: CapsuleData) => void
}

export default function ScannerLoading({ imageData: _imageData, onComplete }: Props) {
  useEffect(() => {
    ;(async () => {
      // TODO: send imageData to parsing API
      onComplete({ seriesName: "Example Series", capsuleName: "Example Capsule" })
    })()
  }, [])

  return (
    <section>
      <div className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative h-56">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,white_3px,white_4px)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          <p className="text-white/60 text-[11px]">Parsing pamphlet…</p>
        </div>
      </div>
      <footer className="px-3 pb-4 pt-3">
        <p className="text-xs text-fg-secondary text-center">This usually takes a few seconds</p>
      </footer>
    </section>
  )
}
