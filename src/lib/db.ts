import postgres from 'postgres'

if (!process.env.DB_URL) {
    throw Error("DB_URL environment variable not configured.")
}

const sql = postgres(process.env.DB_URL)

export default sql
