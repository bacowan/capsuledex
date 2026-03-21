"use client"

import { useHomeContext } from "@/app/homeContext";
import { useEffect, useRef, useState } from "react";
import Sheet from "./Sheet";

export default function ScannerSheet() {
  const { sheetOpened, setSheetOpened } = useHomeContext()
  const [scanState, setScanState] = useState<"idle" | "scanning" | "not found" | "no permissions">("idle")
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (sheetOpened === "scan") {
      (async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'enviroment' }}
          })
          setCameraStream(stream)
        } catch (error) {
          setScanState("no permissions")
        }
      })()
    }
    else if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
    }
  }, [sheetOpened])

  useEffect(() => {
    if (sheetOpened === "scan" && videoRef.current !== null && cameraStream !== null) {
      videoRef.current.srcObject = cameraStream
    }
  }, [cameraStream, sheetOpened])

  if (sheetOpened !== "scan") return <></>

  return (
    <Sheet onClose={() => setSheetOpened(null)}>

      {/* ── State 1: Idle ── */}
      {/* TODO: show only when state === "idle" */}
      {
        scanState === "idle" &&
        <section>
          <div className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative h-56">
            <video className="absolute inset-0 w-full h-full object-cover"
              autoPlay playsInline muted
              ref={videoRef}/>
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
            {/* TODO: close scanner, open manual entry sheet */}
            <button className="w-full py-2 border border-edge rounded-lg text-xs text-fg-secondary hover:bg-subtle transition-colors text-center">
              Enter barcode manually
            </button>
          </footer>
        </section>
      }

      {/* ── State 2: Scanning ── */}
      {/* TODO: show only when state === "scanning" */}
      {
        scanState === "scanning" &&
        <section>
          <div className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative h-56">
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,white_3px,white_4px)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-24 relative">
                <div className="absolute inset-0 bg-green-400/10 rounded" />
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-400 rounded-tl" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-400 rounded-tr" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-400 rounded-bl" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green-400 rounded-br" />
              </div>
            </div>
            <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs border-none">
              ⚡
            </button>
            <p className="absolute bottom-2 inset-x-0 text-center text-[11px] text-white/50">
              Found — looking up…
            </p>
          </div>
          <footer className="px-3 pb-4 pt-2">
            <button className="w-full py-2 border border-edge rounded-lg text-xs text-fg-secondary hover:bg-subtle transition-colors text-center">
              Enter barcode manually
            </button>
          </footer>
        </section>
      }

      {/* ── State: No permissions ── */}
      {
        scanState === "no permissions" &&
        <section>
          <div className="bg-neutral-900 mx-3 rounded-xl overflow-hidden relative h-56">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">🚫</div>
              <p className="text-white text-[13px] font-medium">Camera access required</p>
              <p className="text-white/50 text-[11px]">Allow camera access in your browser settings, then reopen the scanner.</p>
            </div>
          </div>
          <footer className="px-3 pb-4 pt-2">
            <button className="w-full py-2 border border-edge rounded-lg text-xs text-fg-secondary hover:bg-subtle transition-colors text-center">
              Enter barcode manually
            </button>
          </footer>
        </section>
      }

      {/* ── State 3: Not found ── */}
      {/* TODO: show only when state === "not-found" */}
      {
        scanState === "not found" &&
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
            <p className="absolute bottom-2 inset-x-0 text-center text-[11px] text-white/40">
              4 972 …
            </p>
          </div>
          <footer className="px-3 pb-4 pt-3">
            <h2 className="text-[13px] font-medium text-fg mb-1">Not in the database yet</h2>
            <p className="text-xs text-fg-secondary mb-3">Be the first to add this series.</p>
            {/* TODO: start add series flow */}
            <button className="w-full py-2.5 bg-brand text-white text-sm font-medium rounded-lg mb-2 hover:bg-brand-hover transition-colors">
              Add series
            </button>
            {/* TODO: reset to idle state */}
            <button className="w-full py-2 border border-edge rounded-lg text-xs text-fg-secondary hover:bg-subtle transition-colors">
              Scan another
            </button>
          </footer>
        </section>
      }

    </Sheet>
  );
}
