type ButtonVariant = "primary" | "secondary" | "ghost"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white font-medium hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-default",
  secondary: "border border-edge text-fg hover:bg-subtle transition-colors",
  ghost: "bg-transparent border-none text-fg-secondary hover:text-fg transition-colors p-0",
}

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={`${variantClasses[variant]} ${className ?? ""}`}
      {...props}
    />
  )
}
