create table series (
    id bigint primary key generated always as identity,
    barcode bigint not null,
    name text,
    line text,
    official_url text,
    pamphlet_front_id text,
    pamphlet_back_id text,
    brand_id bigint not null references brand (id)
)