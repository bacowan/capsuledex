type ProgressBarProps = {
  value: number // 0–100
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="h-1 rounded-full bg-subtle overflow-hidden">
      <div
        className="h-full rounded-full bg-brand transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
