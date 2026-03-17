create table variant (
    id bigint primary key generated always as identity,
    public_id UUID unique not null,
    name text,
    series_id bigint not null references series(id)
)