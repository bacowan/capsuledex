'use client'

import { useEffect, useState } from "react"
import createClient from "@/lib/supabase/ssrClient"
import { meetsPasswordRequirements } from "@/lib/password"
import { isValidEmail } from "@/lib/email"
import { useSearchParams, useRouter } from "next/navigation"
import Button from "@/components/Button"

export default function SignUpForm() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const isFormValid = !passwordError && !confirmPasswordError && !emailError

  useEffect(() => {
    const error = meetsPasswordRequirements(password)
    if (error) {
      setPasswordError(error)
    }
    else {
      setPasswordError('')
    }
  }, [password])

  useEffect(() => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
    }
    else {
      setConfirmPasswordError('')
    }
  })

  useEffect(() => {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email')
    }
    else {
      setEmailError('')
    }
  }, [email])

  const onCreateAccountClicked = async () => {
    const client = createClient()
    const { data: _, error } = await client.auth.signUp({
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
        Username
        <input type="text" name="username" placeholder="gachafan42" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors font-normal" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
        Email
        <input type="email" name="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors font-normal" />
        {emailError && <span className="text-xs text-red-500 font-normal">{emailError}</span>}
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
        Password
        <input type="password" name="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors font-normal" />
        {passwordError && <span className="text-xs text-red-500 font-normal">{passwordError}</span>}
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-fg">
        Confirm password
        <input type="password" name="confirm-password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 text-sm bg-surface border border-edge rounded-lg text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand transition-colors font-normal" />
        {confirmPasswordError && <span className="text-xs text-red-500 font-normal">{confirmPasswordError}</span>}
      </label>

      {submitError && (
        <p className="text-xs text-red-500 text-center">{submitError}</p>
      )}

      <Button
        type="submit"
        disabled={!isFormValid}
        className="w-full py-2 px-4 text-sm rounded-lg mt-1"
        onClick={onCreateAccountClicked}
      >
        Create account
      </Button>

      <p className="text-xs text-fg-muted text-center">
        By signing up you agree to our{" "}
        <a href="#" className="underline underline-offset-2 hover:text-fg-secondary">Terms of Service</a>
        {" "}and{" "}
        <a href="#" className="underline underline-offset-2 hover:text-fg-secondary">Privacy Policy</a>.
      </p>
    </form>
  )
}
