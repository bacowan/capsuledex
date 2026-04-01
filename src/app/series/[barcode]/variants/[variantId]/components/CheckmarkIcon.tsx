export default function CheckmarkIcon({ stroke }: { stroke: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      fill="none"
      className="w-3.5 h-3.5"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 4L3.5 6.5L7 1.5" />
    </svg>
  );
}
