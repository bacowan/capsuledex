create table brand (
    id bigint primary key generated always as identity,
    public_id text,
    name text,
    official_url text
)