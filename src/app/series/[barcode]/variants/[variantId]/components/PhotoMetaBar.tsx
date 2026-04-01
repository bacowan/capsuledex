import Button from "@/components/Button";

export default function PhotoMetaBar() {
  return (
    <div className="px-4 py-2.5 border-b border-edge-subtle bg-surface flex items-center justify-between">
      {/* State A — photo exists */}
      {/* TODO: show only the correct state based on whether photos exist */}
      <>
        <span className="text-[11px] text-fg-muted">Top-voted · 3 photos total</span>
        {/* TODO: navigate to photo gallery */}
        <Button variant="ghost" className="flex items-center gap-1 text-xs cursor-pointer">
          Browse all photos
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-3 h-3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Button>
      </>

      {/* State B — no photos */}
      {/* TODO: show only the correct state based on whether photos exist */}
      {/* <span className="text-[11px] text-fg-muted">No photos yet</span> */}
    </div>
  );
}
