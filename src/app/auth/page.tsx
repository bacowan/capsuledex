import { getUser, getUserId } from "@/lib/getUser"
import AuthPageClient from "./pageClient"
import { createClient } from "@/lib/supabase/ssrServer"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const userId = await getUserId()
  if (userId) {
    const { next } = await searchParams
    if (next && next.startsWith('/')) {
      redirect(next)
    }
    else {
      redirect("/")
    }
  }

  return <AuthPageClient/>
}
