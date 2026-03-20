// TODO: add "use client" when wiring up interactions

export default function ManualEntrySheet() {
  return (
    <dialog open className="fixed inset-x-0 bottom-0 bg-surface rounded-t-2xl border-t border-edge overflow-hidden md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:w-[360px] md:border md:border-edge">

      {/* Drag handle — mobile only */}
      <div className="w-9 h-1 bg-edge rounded-full mx-auto mt-3 mb-1 md:hidden" />

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

    </dialog>
  );
}
