"use client"

import { useHomeContext } from "@/app/context/homeContext";
import Sheet from "./Sheet";

export default function ManualEntrySheet() {
  const { sheetOpened, setSheetOpened } = useHomeContext()

  if (sheetOpened !== "manual") return <></>

  return (
    <Sheet onClose={() => setSheetOpened(null)}>
      <form className="px-4 pb-5 pt-1 flex flex-col gap-3">
        <h2 className="text-[13px] font-medium text-fg">Enter barcode number</h2>

        <label className="flex items-center border border-edge rounded-xl overflow-hidden bg-surface h-[42px]">
          <span className="px-3 text-base text-fg-muted border-r border-edge h-full flex items-center">
            #
          </span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="4 9 0 1 …"
            className="flex-1 px-3 text-sm text-fg outline-none placeholder:text-fg-muted bg-transparent h-full"
          />
        </label>

        <p className="text-[11px] text-fg-muted text-center -mt-1">13-digit EAN barcode</p>

        {/* TODO: handle lookup */}
        <button type="submit" className="w-full py-3 bg-brand text-white text-sm font-medium rounded-xl hover:bg-brand-hover transition-colors">
          Look up
        </button>
      </form>

    </Sheet>
  );
}
