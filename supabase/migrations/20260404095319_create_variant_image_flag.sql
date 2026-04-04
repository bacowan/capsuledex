create table variant_image_flag (
    id bigint primary key generated always as identity,
    variant_image_id bigint not null references variant_image(id) ON DELETE CASCADE,
    user_id bigint not null references user_profile(id) ON DELETE CASCADE,
    created_on TIMESTAMPTZ DEFAULT now(),
    unique (variant_image_id, user_id)
)