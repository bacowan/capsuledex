"use client"

import { useHomeContext } from "@/app/context/homeContext";
import Button from "@/components/Button";

export default function Hero() {
  const { setSheetOpened } = useHomeContext()

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
        <Button
          onClick={() => setSheetOpened("scan")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm border-none">
          <div className="w-[14px] h-[11px] flex flex-col justify-between shrink-0">
            <div className="h-[2px] w-full bg-white/90 rounded-sm" />
            <div className="h-[2px] w-[60%] bg-white/90 rounded-sm" />
            <div className="h-[2px] w-[80%] bg-white/90 rounded-sm" />
            <div className="h-[2px] w-full bg-white/90 rounded-sm" />
          </div>
          Scan
        </Button>
        {/* TODO: open manual entry sheet */}
        <Button
          onClick={() => setSheetOpened("manual")}
          variant="secondary"
          className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-medium">
          # Enter manually
        </Button>
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
          <Button className="px-4 h-[38px] text-sm rounded-xl shrink-0">
            Look up
          </Button>
        </div>

        {/* Use camera link */}
        <div className="flex items-center gap-1 text-[11px] text-fg-muted">
          {/* TODO: open scanner sheet */}
          <button
            className="flex items-center gap-1 bg-transparent border-none text-[11px] text-fg-muted hover:text-fg-secondary p-0"
            onClick={() => setSheetOpened("scan")}>
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
