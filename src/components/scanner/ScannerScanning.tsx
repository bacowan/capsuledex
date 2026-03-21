"use client"

import { useEffect, useRef } from "react"
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library"
import { useRouter } from "next/navigation"

type Props = {
  onNotFound: () => void
  onManualEntry: () => void
  onNoPermissions: () => void
}

export default function ScannerScanning({ onNotFound, onManualEntry, onNoPermissions }: Props) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const readerRef = useRef<BrowserMultiFormatReader>(null)
  if (readerRef.current === null) {
    readerRef.current = new BrowserMultiFormatReader(
      new Map([[DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13]]])
    )
  }

  const loadSeriesByBarcode = async (barcode: string) => {
    // TODO: disable camera/ show loading spinner
    const result = await fetch(`/api/v1/series/${barcode}`)
    if (result.ok) {
      router.push(`/capsules/${barcode}`)
    }
    else if (result.status === 404) {
      onNotFound()
    }
    else {
      // TODO: Error handling
    }
  }

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }}
        })
        if (videoRef.current && readerRef.current) {
          readerRef.current.decodeFromStream(stream, videoRef.current, (res, err) => {
            if (res) {
              loadSeriesByBarcode(res.getText())
            }
            else if (err) {
              // TODO: Error handling
            }
          })
        }
      } catch {
        onNoPermissions()
      }
    })()

    return () => {
      readerRef.current?.reset()
      stream?.getTracks().forEach(track => track.stop())
    }
  }, [])

  return (
    <section>
      <div className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative h-56">
        <video className="absolute inset-0 w-full h-full object-cover" playsInline muted ref={videoRef} />
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,white_3px,white_4px)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-24 relative">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white rounded-br" />
            <div className="absolute top-1/2 left-3 right-3 h-px bg-pink-400 opacity-90 -translate-y-px" />
          </div>
        </div>
        <p className="absolute bottom-2 inset-x-0 text-center text-[11px] text-white/50">
          Point at a barcode
        </p>
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
