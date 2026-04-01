'use client'

import createClient from "@/lib/supabase/ssrClient";
import Button from "@/components/Button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const nextPath = searchParams.get('next')
    ?? (searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname)

  useEffect(() => {
    const client = createClient()
    const { data } = client.auth.onAuthStateChange((event, session) => {
        setIsLoggedIn(!!session?.user)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const logOut = async () => {
    const client = createClient()
    await client.auth.signOut()
  }

  const navLink = (href: string, label: string, mobile = false) => {
    const active = pathname === href
    const base = mobile
      ? "px-3 py-2.5 text-sm rounded-lg text-left"
      : "px-3 py-1.5 text-sm rounded-lg"
    const style = active
      ? "font-medium text-fg"
      : "text-fg-secondary hover:bg-subtle hover:text-fg"
    return (
      <Link href={href} className={`${base} ${style}`}>
        {label}
      </Link>
    )
  }

  return (
    <header className="group/nav sticky top-0 z-10 w-full bg-surface border-b border-edge">
      {/* Hidden checkbox drives the mobile menu open/close state */}
      <input type="checkbox" id="nav-toggle" className="peer sr-only" />

      <div className="h-13 flex items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <div className="w-[22px] h-[22px] rounded-full border-2 border-brand flex items-center justify-center">
            <div className="w-[10px] h-[10px] rounded-full bg-brand" />
          </div>
          <span className="text-base font-medium tracking-tight">gachabase</span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLink("/browse", "Browse")}
          {isLoggedIn && navLink("/collection", "Collection")}
          <div className="w-px h-[18px] bg-edge mx-1" />
        </nav>

        {isLoggedIn
          ? <Button variant="secondary" className="px-3.5 py-1.5 text-sm rounded-lg" onClick={logOut}>Sign out</Button>
          : <Link href={`/auth?next=${nextPath}`} className="px-3.5 py-1.5 text-sm border border-edge rounded-lg text-fg hover:bg-subtle">Sign in</Link>
        }

        {/* Hamburger label — toggles the checkbox, visible on mobile only */}
        <label htmlFor="nav-toggle" className="sm:hidden ml-2 p-2 rounded-lg hover:bg-subtle text-fg">
          {/* Hamburger icon — hidden when menu is open */}
          <div className="w-4 h-4 flex flex-col justify-between group-has-[:checked]/nav:hidden">
            <div className="h-[2px] w-full bg-current rounded-sm" />
            <div className="h-[2px] w-full bg-current rounded-sm" />
            <div className="h-[2px] w-full bg-current rounded-sm" />
          </div>
          {/* × icon — shown when menu is open */}
          <div className="w-4 h-4 hidden flex-col justify-center gap-[5px] group-has-[:checked]/nav:flex">
            <div className="h-[2px] w-full bg-current rounded-sm rotate-45 translate-y-[3.5px]" />
            <div className="h-[2px] w-full bg-current rounded-sm -rotate-45 -translate-y-[3.5px]" />
          </div>
        </label>
      </div>

      {/* Mobile menu — revealed when checkbox is checked */}
      <nav className="hidden peer-checked:flex sm:hidden flex-col border-t border-edge px-2 py-2">
        {navLink("/browse", "Browse", true)}
        {isLoggedIn && navLink("/collection", "Collection", true)}
      </nav>
    </header>
  );
}
