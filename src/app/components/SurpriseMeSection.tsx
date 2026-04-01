// TODO: add "use client" and useState to toggle between idle and revealed states

import Button from "@/components/Button"

export default function SurpriseMeSection() {
  return (
    <section className="border-y border-edge-subtle py-4 px-5 flex flex-col items-center gap-3">

      {/* Revealed state — TODO: show only when a result is available */}
      <article className="w-full max-w-[340px] border border-edge-accent rounded-xl overflow-hidden">
        <header className="flex items-center px-3 py-2 bg-accent-surface border-b border-edge-accent">
          <span className="text-[11px] uppercase tracking-wider font-medium text-fg-accent">
            Random pick
          </span>
          {/* TODO: dismiss card */}
          <button className="ml-auto bg-transparent border-none text-fg-accent-secondary text-sm opacity-70 hover:opacity-100 p-0">
            ×
          </button>
        </header>

        <div className="flex items-center gap-3 p-3">
          <figure className="w-12 h-12 rounded-lg border border-edge-subtle bg-surface-success flex items-center justify-center text-2xl shrink-0 m-0">
            🍄
          </figure>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-fg-muted mb-0.5">Epoch</p>
            <p className="text-[13px] font-medium text-fg mb-0.5">Mushroom Forest</p>
            <p className="text-xs text-fg-secondary">5 variants</p>
          </div>
          {/* TODO: navigate to series page */}
          <Button className="ml-auto shrink-0 px-3 py-1.5 text-xs rounded-lg">
            View
          </Button>
        </div>
      </article>

      {/* Button — "Surprise me" when idle, "Another one" when revealed */}
      {/* TODO: fetch random series and show card on click */}
      <Button variant="secondary" className="px-6 py-2 text-sm font-medium rounded-xl">
        Another one
      </Button>

    </section>
  );
}
