'use client'

export default function SignInForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
        Email
        <input type="email" name="email" placeholder="you@example.com" className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors font-normal" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
        Password
        <input type="password" name="password" placeholder="••••••••" className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors font-normal" />
      </label>

      <div className="flex justify-end -mt-1">
        <button type="button" className="text-xs text-fg-secondary hover:text-fg underline underline-offset-2">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors mt-1"
      >
        Sign in
      </button>
    </form>
  )
}
