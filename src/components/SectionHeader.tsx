type SectionHeaderVariant = "default" | "label"

type SectionHeaderProps = {
  title: string
  children?: React.ReactNode
  variant?: SectionHeaderVariant
  className?: string
}

const titleClasses: Record<SectionHeaderVariant, string> = {
  default: "text-[13px] font-medium text-fg",
  label: "text-[11px] font-medium text-fg-secondary uppercase tracking-widest",
}

export default function SectionHeader({ title, children, variant = "default", className }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className ?? ""}`}>
      <span className={titleClasses[variant]}>{title}</span>
      {children}
    </div>
  )
}
