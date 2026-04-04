create table variant_image (
    id bigint primary key generated always as identity,
    file_name text unique not null,
    created_user_id UUID not null,
    variant_id bigint not null references variant(id),
    created_on TIMESTAMPTZ DEFAULT now(),
    unique (created_user_id, variant_id)
)