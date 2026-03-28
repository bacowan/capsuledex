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

          <div className="px-6 py-6 flex flex-col gap-4">
            {tab === "sign-in" ? <SignInForm /> : <SignUpForm />}

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-edge" />
              <span className="text-xs text-fg-muted">or</span>
              <div className="flex-1 h-px bg-edge" />
            </div>

            <button
              type="button"
              onClick={() => {}}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-surface border border-edge rounded-lg text-sm font-medium text-fg hover:bg-surface-hover transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </button>
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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
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
