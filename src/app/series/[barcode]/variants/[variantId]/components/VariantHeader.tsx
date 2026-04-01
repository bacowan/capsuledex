import Button from "@/components/Button";
import CheckmarkIcon from "./CheckmarkIcon";

export default function VariantHeader() {
  return (
    <div className="px-4 pt-4 pb-5 border-b border-neutral-100 bg-white">
      <div className="flex items-start gap-3">
        {/* Left block */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
            Penguin Parade Vol.3 · #1
          </p>
          <h1 className="text-xl font-medium text-neutral-900 tracking-tight leading-tight mb-1">
            Emperor
          </h1>
          <p className="text-xs text-neutral-500">Qualia</p>
        </div>

        {/* Copy link button */}
        {/* TODO: copy variant URL to clipboard */}
        <button className="shrink-0 mt-0.5 w-[34px] h-[34px] rounded-lg border border-neutral-200 flex items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors bg-transparent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-[15px] h-[15px]"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
      </div>

      {/* Owned button — two states, always visible for styling */}
      {/* TODO: toggle between states with useState */}
      <div className="mt-3.5 w-full flex flex-col gap-2">
        {/* Owned state */}
        {/* TODO: remove from collection on click */}
        <Button className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2">
          <CheckmarkIcon stroke="white" />
          I own this
        </Button>

        {/* Not-owned state */}
        {/* TODO: add to collection on click */}
        <Button variant="secondary" className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2">
          <CheckmarkIcon stroke="currentColor" />
          Add to collection
        </Button>
      </div>
    </div>
  );
}
