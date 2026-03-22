create table pamphlet (
    id bigint primary key generated always as identity,
    file_name text unique not null,
    is_front boolean not null,
    created_user_id UUID not null,
    series_id bigint not null references series(id),
    unique (is_front, created_user_id, series_id)
)