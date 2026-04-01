type ButtonVariant = "primary" | "secondary"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white font-medium hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-default",
  secondary: "border border-edge text-fg hover:bg-subtle transition-colors",
}

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={`${variantClasses[variant]} ${className ?? ""}`}
      {...props}
    />
  )
}
