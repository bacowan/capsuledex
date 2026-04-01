export default function Breadcrumb() {
  return (
    <div className="px-4 py-3 border-b border-edge-subtle bg-surface">
      {/* TODO: link to /series/[barcode] */}
      <a className="inline-flex items-center gap-1 text-xs text-fg-secondary cursor-pointer hover:text-fg no-underline">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3 h-3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        </svg>
        Penguin Parade Vol.3
      </a>
    </div>
  );
}
