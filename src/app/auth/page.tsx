import { getUser } from "@/lib/getUser"
import AuthPageClient from "./clientPage"
import { redirect } from "next/navigation"

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const user = await getUser()
  if (user) {
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
