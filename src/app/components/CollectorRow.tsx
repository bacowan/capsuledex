const previewBgMap: Record<string, string> = {
  "🐧": "#E1F5EE",
  "🐱": "#FBEAF0",
  "🦆": "#E6F1FB",
  "🍄": "#EAF3DE",
  "🌙": "#FBEAF0",
  "🦊": "#FAEEDA",
  "🍡": "#E6F1FB",
  "🌸": "#EEEDFE",
  "🐸": "#FAEEDA",
  "🐼": "#EAF3DE",
};

interface CollectorRowProps {
  avatarBg: string;
  avatarEmoji: string;
  username: string;
  capsules: number;
  series: number;
  complete: number;
  previewEmojis: string[];
}

export default function CollectorRow({
  avatarBg,
  avatarEmoji,
  username,
  capsules,
  series,
  complete,
  previewEmojis,
}: CollectorRowProps) {
  return (
    // TODO: navigate to /users/[id]/collection on click
    <div className="flex items-center gap-3.5 p-3.5 bg-surface border border-edge rounded-xl cursor-pointer hover:bg-subtle transition-colors">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full border border-edge-subtle flex items-center justify-center text-lg shrink-0"
        style={{ backgroundColor: avatarBg }}
      >
        {avatarEmoji}
      </div>

      {/* Info block */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-fg mb-0.5">{username}</div>
        <div className="text-xs text-fg-secondary">
          {capsules} capsules · {series} series · {complete} complete
        </div>
      </div>

      {/* Preview pips */}
      <div className="flex gap-1 shrink-0">
        {previewEmojis.map((emoji, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-lg border border-edge-subtle flex items-center justify-center text-sm"
            style={{ backgroundColor: previewBgMap[emoji] ?? "#f5f5f5" }}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
