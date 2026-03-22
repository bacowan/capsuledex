import 'server-only'
import { createClient, SupabaseClient } from "@supabase/supabase-js"

let supabase: SupabaseClient
if (!process.env.PROJECT_URL) {
    throw Error("DB_URL environment variable not configured.")
}
else if (!process.env.SUPABASE_KEY) {
    throw Error("SUPABASE_KEY environment variable not configured.")
}
else {
    supabase = createClient(process.env.PROJECT_URL, process.env.SUPABASE_KEY)
}

export default supabase