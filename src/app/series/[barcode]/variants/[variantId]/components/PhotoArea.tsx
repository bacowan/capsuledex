import CameraIcon from "./CameraIcon";

export default function PhotoArea() {
  return (
    <>
      {/* State A — photo exists */}
      {/* TODO: show only the correct state based on whether photos exist */}
      <div className="aspect-square max-h-[360px] relative overflow-hidden flex items-center justify-center bg-[#E1F5EE]">
        {/* Placeholder — will be replaced by actual <img> with object-fit: cover */}
        <span className="text-7xl">🐧</span>

        {/* Overlay buttons — bottom-right */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 items-end">
          {/* TODO: open photo upload sheet */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 border border-black/10 rounded-full text-[11px] font-medium text-neutral-900 cursor-pointer hover:bg-white transition-colors">
            <CameraIcon className="w-3 h-3" />
            Upload photo
          </button>
          {/* TODO: open flag confirmation */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 border border-black/10 rounded-full text-[11px] text-black/40 cursor-pointer hover:text-black/60 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-3 h-3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 21V4M4 4l10 3-10 3" />
            </svg>
            Flag photo
          </button>
        </div>

        {/* Attribution label — bottom-left */}
        <div className="absolute bottom-3 left-3 text-[10px] text-black/35 bg-white/70 px-2 py-1 rounded-full">
          Photo by yuki_collects
        </div>
      </div>

      {/* State B — no photos yet */}
      {/* TODO: show only the correct state based on whether photos exist */}
      <div className="aspect-square max-h-[360px] relative overflow-hidden flex items-center justify-center bg-neutral-100">
        <div className="flex flex-col items-center justify-center gap-2.5 text-center">
          <CameraIcon className="w-8 h-8 text-black/20" />
          <p className="text-sm font-medium text-black/30">No photos yet</p>
          <p className="text-[11px] text-black/20 leading-relaxed">
            Be the first to upload{"\n"}a photo of this variant
          </p>
          {/* TODO: open photo upload sheet */}
          <button className="mt-1 flex items-center gap-1.5 px-4 py-2 bg-white/90 border border-black/10 rounded-full text-xs font-medium text-neutral-900 cursor-pointer hover:bg-white transition-colors">
            <CameraIcon className="w-3 h-3" />
            Upload photo
          </button>
        </div>
      </div>
    </>
  );
}
