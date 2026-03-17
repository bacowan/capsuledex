create table brand (
    id bigint primary key generated always as identity,
    public_id UUID unique not null,
    name text,
    official_url text
)