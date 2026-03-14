import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../../supabase/database.types"

let supabase: SupabaseClient<Database>
if (!process.env.PROJECT_URL) {
    throw Error("DB_URL environment variable not configured.")
}
else if (!process.env.SUPABASE_KEY) {
    throw Error("SUPABASE_KEY environment variable not configured.")
}
else {
    supabase = createClient<Database>(process.env.PROJECT_URL, process.env.SUPABASE_KEY)
}

export default supabase