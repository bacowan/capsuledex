import { createBrowserClient } from "@supabase/ssr"
import { SupabaseClient } from "@supabase/supabase-js"

let createClient: () => SupabaseClient<any, "public", "public", any, any>
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw Error("NEXT_PUBLIC_SUPABASE_URL environment variable not configured.")
}
else if (!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    throw Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variable not configured.")
}
else {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    createClient = () => createBrowserClient(url, key)
}

export default createClient