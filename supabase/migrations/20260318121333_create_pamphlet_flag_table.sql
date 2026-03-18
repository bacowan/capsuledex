create table pamphlet_flag (
    id bigint primary key generated always as identity,
    pamphlet_id bigint not null references pamphlet(id) ON DELETE CASCADE,
    user_id bigint not null references user_profile(id) ON DELETE CASCADE,
    unique (pamphlet_id, user_id)
)