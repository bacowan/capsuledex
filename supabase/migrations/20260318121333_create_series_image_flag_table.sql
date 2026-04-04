create table series_image_flag (
    id bigint primary key generated always as identity,
    series_image_id bigint not null references series_image(id) ON DELETE CASCADE,
    user_id bigint not null references user_profile(id) ON DELETE CASCADE,
    created_on TIMESTAMPTZ DEFAULT now(),
    unique (series_image_id, user_id)
)