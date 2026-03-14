create table variant (
    id bigint primary key generated always as identity,
    name text,
    series_id bigint references series(id)
)