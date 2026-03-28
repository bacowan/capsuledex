import { NextRequest } from 'next/server'
import { proxyChain } from './proxies/proxyChain'
import { supabaseProxy } from './proxies/supabase'

const proxies = [
  supabaseProxy
]

export async function proxy(request: NextRequest) {
  return await proxyChain(proxies, request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
