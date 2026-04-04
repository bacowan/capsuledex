create table user_collection (
    id bigint primary key generated always as identity,
    variant_id bigint not null references variant(id),
    user_id bigint not null references user_profile(id) ON DELETE CASCADE,
    obtained_at TIMESTAMPTZ DEFAULT NOW(),
    unique (variant_id, user_id),
    created_on TIMESTAMPTZ DEFAULT now()
)