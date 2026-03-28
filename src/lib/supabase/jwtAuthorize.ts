import supabase from "@/lib/supabase/jwtSupabase"

const authorize = async (request: Request) => {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
        return Response.json({ error: "Missing authorization token" }, { status: 401 })
    }
    const { data, error: authError } = await supabase.auth.getUser(token)
    if (authError) {
        return Response.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    return data.user
}

export default authorize