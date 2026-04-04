create table series_image (
    id bigint primary key generated always as identity,
    file_name text unique not null,
    type CHAR(1) not null, -- 'P' for pamphlet, 'M' for machine. TODO: check constraint
    created_user_id UUID not null,
    series_id bigint not null references series(id),
    unique (type, created_user_id, series_id),
    created_on TIMESTAMPTZ DEFAULT now()
)