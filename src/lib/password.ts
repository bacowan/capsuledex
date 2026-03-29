const ALLOWED = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};'\\:"|<>?,./`~]+$/

export function meetsPasswordRequirements(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters"
  if (!ALLOWED.test(password)) return "Password may only contain letters, numbers, and the symbols: !@#$%^&*()_+-=[]{};\':\"\\|<>?,./`~"
  return null
}
