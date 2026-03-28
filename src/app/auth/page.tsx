import { getUser } from "@/lib/getUser"
import AuthPageClient from "./pageClient"
import { createClient } from "@/lib/supabase/ssrServer"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"

export default async function AuthPage() {
  const client = await createClient()
  const { data } = await client.auth.getClaims()
  const userId = data?.claims.sub
  if (userId !== undefined) {
    redirect("/")
  }

  return <AuthPageClient/>
}
