'use client'

import { useState } from "react"
import SignInForm from "./components/SignInForm"
import SignUpForm from "./components/SignUpForm"
import GoogleButton from "./components/GoogleButton"
import createClient from "@/lib/supabase/ssrClient"
import { useSearchParams } from "next/navigation"

type Tab = "sign-in" | "sign-up"

export default function AuthPageClient() {
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

            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  )
}
