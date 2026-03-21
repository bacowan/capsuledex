"use client"

import { useEffect, useRef, useState } from "react"
import { Camera } from "react-feather"

type Props = {
  onPhotoCaptured: (imageData: string) => void
  onScanAnother: () => void
}

export default function ScannerPhotoCapture({ onPhotoCaptured, onScanAnother }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    ;(async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }}
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    })()

    return () => {
      stream?.getTracks().forEach(track => track.stop())
    }
  }, [])

  function capturePhoto() {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext("2d")?.drawImage(video, 0, 0)
    onPhotoCaptured(canvas.toDataURL("image/jpeg", 0.9))
  }

  return (
    <section>
      <div
        className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative"
        style={{ aspectRatio: aspectRatio ?? '4/3' }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          playsInline muted ref={videoRef}
          onLoadedMetadata={(e) => setAspectRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight)}
        />
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,white_3px,white_4px)]" />
        <p className="absolute top-3 inset-x-0 text-center text-[11px] text-white/60">
          Scan the front of the pamphlet
        </p>
        <div className="absolute bottom-4 inset-x-0 flex justify-center">
          <button
            onClick={capturePhoto}
            className="w-14 h-14 rounded-full bg-white border-4 border-white/30 shadow-lg active:scale-95 transition-transform flex items-center justify-center"
          >
            <Camera size={22} className="text-neutral-800" />
          </button>
        </div>
      </div>
      <footer className="px-3 pb-4 pt-3">
        <p className="text-xs text-fg-secondary text-center mb-3">
          Position the pamphlet front within view, then tap to capture
        </p>
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
