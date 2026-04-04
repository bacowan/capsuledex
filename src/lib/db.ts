import postgres from 'postgres'

if (!process.env.DB_URL) {
    throw Error("DB_URL environment variable not configured.")
}

let sql: postgres.Sql<{}>
if (process.env.DEBUG === "true") {
    sql = postgres(process.env.DB_URL, {
        debug: (_, query, params) => console.log(query, params)
    })
}
else {
    sql = postgres(process.env.DB_URL)
}

export default sql
