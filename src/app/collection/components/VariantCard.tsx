type VariantCardProps = {
  name: string;
  emoji: string;
  owned: boolean;
};

export default function VariantCard({ name, emoji, owned }: VariantCardProps) {
  return (
    <div className={`flex-shrink-0 w-28 flex flex-col gap-1 ${!owned ? "opacity-40" : ""}`}>
      <div
        className={`group w-28 h-28 rounded-lg border flex items-center justify-center relative overflow-hidden ${
          owned ? "bg-accent-surface border-edge-accent" : "bg-subtle border-edge"
        }`}
      >
        <span className="text-xl">{emoji}</span>

        {owned && (
          <>
            {/* Pink checkmark badge */}
            <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-brand flex items-center justify-center">
              <svg className="w-2 h-2" viewBox="0 0 8 8" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1.5 4.5L3 6L6.5 2" />
              </svg>
            </div>

            {/* Camera upload icon — always visible on mobile, hover on desktop */}
            {/* TODO: open variant photo upload */}
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded bg-black/30 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100">
              <svg className="w-4 h-4" viewBox="0 0 10 10" fill="white">
                <path d="M3.8 1.5 L3.2 2.5 H1.5 C1.2 2.5 1 2.7 1 3 V7.5 C1 7.8 1.2 8 1.5 8 H8.5 C8.8 8 9 7.8 9 7.5 V3 C9 2.7 8.8 2.5 8.5 2.5 H6.8 L6.2 1.5 Z M5 6.5 C4 6.5 3.2 5.7 3.2 4.7 C3.2 3.7 4 2.9 5 2.9 C6 2.9 6.8 3.7 6.8 4.7 C6.8 5.7 6 6.5 5 6.5 Z M5 5.8 C5.6 5.8 6.1 5.3 6.1 4.7 C6.1 4.1 5.6 3.6 5 3.6 C4.4 3.6 3.9 4.1 3.9 4.7 C3.9 5.3 4.4 5.8 5 5.8 Z" />
              </svg>
            </div>
          </>
        )}
      </div>

      <span className={`text-[10px] text-center truncate ${owned ? "text-fg" : "text-fg-muted"}`}>
        {name}
      </span>
    </div>
  );
}
