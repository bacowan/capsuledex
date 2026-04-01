type BadgeVariant = "accent" | "success"

type BadgeProps = {
  children: React.ReactNode
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  accent: "bg-accent-surface text-fg-accent-secondary",
  success: "bg-surface-success text-green-800",
}

export default function Badge({ children, variant = "accent" }: BadgeProps) {
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}
