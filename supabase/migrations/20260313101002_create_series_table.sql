create table series (
    id bigint primary key generated always as identity,
    barcode char(13) unique not null,
    name text,
    line text,
    official_url text,
    brand_id bigint not null references brand (id)
)