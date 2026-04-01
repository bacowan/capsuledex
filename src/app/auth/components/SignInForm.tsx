'use client'

import { useEffect, useState } from "react"
import { isValidEmail } from "@/lib/email"
import createClient from "@/lib/supabase/ssrClient"
import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/components/Button"

export default function SignInForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const isFormValid = !emailError && email && password

  useEffect(() => {
    if (email && !isValidEmail(email)) {
      setEmailError('Please enter a valid email')
    } else {
      setEmailError(null)
    }
  }, [email])

  const login = async () => {
    const client = createClient()
    const { data, error } = await client.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      setSubmitError(error.message)
    }
    else {
      const next = searchParams.get('next')
      router.push(next && next.startsWith('/') ? next : '/')
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
        Email
        <input type="email" name="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors font-normal" />
        {emailError && <span className="text-xs text-red-500 font-normal">{emailError}</span>}
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
        Password
        <input type="password" name="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors font-normal" />
      </label>

      <div className="flex justify-end -mt-1">
        <button type="button" className="text-xs text-fg-secondary hover:text-fg underline underline-offset-2">
          Forgot password?
        </button>
      </div>

      {submitError && (
        <p className="text-xs text-red-500 text-center">{submitError}</p>
      )}

      <Button
        type="submit"
        disabled={!isFormValid}
        className="w-full py-2 px-4 text-sm rounded-lg mt-1"
        onClick={login}
      >
        Sign in
      </Button>
    </form>
  )
}
