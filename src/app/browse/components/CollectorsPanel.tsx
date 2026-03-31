import CollectorRow from "@/app/components/CollectorRow";

const collectorList = [
  { avatarBg: "#FBEAF0", avatarEmoji: "🌸", username: "yuki_collects",    capsules: 47,  series: 8,  complete: 3,  previewEmojis: ["🐧", "🐱", "🦆"] },
  { avatarBg: "#E6F1FB", avatarEmoji: "🐸", username: "capsule_ken",      capsules: 112, series: 19, complete: 11, previewEmojis: ["🍄", "🌙", "🦊"] },
  { avatarBg: "#EAF3DE", avatarEmoji: "🐼", username: "gashapon_hoarder", capsules: 89,  series: 14, complete: 7,  previewEmojis: ["🐧", "🍡", "🌸"] },
  { avatarBg: "#EEEDFE", avatarEmoji: "🦋", username: "miniFigureMeg",    capsules: 63,  series: 10, complete: 4,  previewEmojis: ["🐱", "🦆", "🐸"] },
  { avatarBg: "#FAEEDA", avatarEmoji: "🍜", username: "tokyoToys99",      capsules: 201, series: 31, complete: 18, previewEmojis: ["🦊", "🐼", "🍄"] },
];

// TODO: show when Collectors tab is active
export default function CollectorsPanel() {
  return (
    <div className="hidden flex flex-col gap-2 px-4 md:px-6 py-3">
      {collectorList.map((c) => (
        <CollectorRow
          key={c.username}
          avatarBg={c.avatarBg}
          avatarEmoji={c.avatarEmoji}
          username={c.username}
          capsules={c.capsules}
          series={c.series}
          complete={c.complete}
          previewEmojis={c.previewEmojis}
        />
      ))}
    </div>
  );
}
