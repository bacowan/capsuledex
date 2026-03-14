insert into brand (public_id, name, official_url) values
    ('123-abc', 'Bandai', 'https://gashapon.jp/'),
    ('456-def', 'Amuse', 'https://www.amunet.co.jp/');

insert into series (barcode, name, line, official_url, pamphlet_front_id, pamphlet_back_id, brand_id)
    select 4534943758095, 'あまじないフィギュア', 'チョコン九尾', null, null, null, id from brand
    where name = 'Amuse';

insert into variant (name, series_id)
    select 'きんい', id from series
    where barcode = 4534943758095;

insert into variant (name, series_id)
    select 'おこげ', id from series
    where barcode = 4534943758095;

insert into variant (name, series_id)
    select 'かんごおり', id from series
    where barcode = 4534943758095;

insert into variant (name, series_id)
    select 'くずきり', id from series
    where barcode = 4534943758095;
    