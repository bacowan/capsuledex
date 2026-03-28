"use client"

import { useState } from "react"

type Tab = "sign-in" | "sign-up"

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("sign-in")

  return (
    <div className="min-h-[calc(100vh-52px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 rounded-full border-2 border-brand flex items-center justify-center">
            <div className="w-[18px] h-[18px] rounded-full bg-brand" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-surface border border-edge rounded-2xl overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-edge">
            <button
              onClick={() => setTab("sign-in")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === "sign-in"
                  ? "text-fg border-b-2 border-brand -mb-px"
                  : "text-fg-secondary hover:text-fg"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setTab("sign-up")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === "sign-up"
                  ? "text-fg border-b-2 border-brand -mb-px"
                  : "text-fg-secondary hover:text-fg"
              }`}
            >
              Create account
            </button>
          </div>

          <div className="px-6 py-6">
            {tab === "sign-in" ? <SignInForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
    </div>
  )
}

function SignInForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
      <Field label="Email" type="email" name="email" placeholder="you@example.com" />
      <Field label="Password" type="password" name="password" placeholder="••••••••" />

      <div className="flex justify-end -mt-1">
        <button type="button" className="text-xs text-fg-secondary hover:text-fg underline underline-offset-2">
          Forgot password?
        </button>
      </div>

      <PrimaryButton>Sign in</PrimaryButton>
    </form>
  )
}

function SignUpForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
      <Field label="Username" type="text" name="username" placeholder="gachafan42" />
      <Field label="Email" type="email" name="email" placeholder="you@example.com" />
      <Field label="Password" type="password" name="password" placeholder="••••••••" />
      <Field label="Confirm password" type="password" name="confirm-password" placeholder="••••••••" />

      <PrimaryButton>Create account</PrimaryButton>

      <p className="text-xs text-fg-muted text-center">
        By signing up you agree to our{" "}
        <a href="#" className="underline underline-offset-2 hover:text-fg-secondary">Terms of Service</a>
        {" "}and{" "}
        <a href="#" className="underline underline-offset-2 hover:text-fg-secondary">Privacy Policy</a>.
      </p>
    </form>
  )
}

function Field({
  label,
  type,
  name,
  placeholder,
}: {
  label: string
  type: string
  name: string
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors"
      />
    </div>
  )
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full py-2 px-4 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors mt-1"
    >
      {children}
    </button>
  )
}
