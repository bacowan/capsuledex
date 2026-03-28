import { NextResponse, type NextRequest } from 'next/server'

type Proxy = (request: NextRequest) => Promise<NextResponse>

/**
 * Executes proxies in order. If a proxy returns a redirect or error response,
 * the chain stops and that response is returned immediately.
 */
export async function proxyChain(proxies: Proxy[], request: NextRequest)
: Promise<NextResponse> {
  for (const proxy of proxies) {
    const response = await proxy(request)
    if (response.status !== 200) return response
  }
  return NextResponse.next({ request })
}
