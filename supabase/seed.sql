insert into brand (public_id, name, official_url) values
    ('7ae38af8-2e20-4814-9da5-27274b47f18a', 'Bandai', 'https://gashapon.jp/'),
    ('04e32583-0e2a-400a-9fb9-879913b20b70', 'Amuse', 'https://www.amunet.co.jp/');

insert into series (barcode, name, line, official_url, pamphlet_front_id, pamphlet_back_id, brand_id)
    select '4534943758095', 'あまじないフィギュア', 'チョコン九尾', null, null, null, id from brand
    where name = 'Amuse';

insert into variant (name, public_id, series_id)
    select 'きんい', '415c0c38-2451-4365-b2ee-fdaaa123686a', id from series
    where barcode = '4534943758095';

insert into variant (name, public_id, series_id)
    select 'おこげ', 'a5e03f88-7b76-485b-8003-00887087b223', id from series
    where barcode = '4534943758095';

insert into variant (name, public_id, series_id)
    select 'かんごおり', 'b1e3c00b-203c-48fd-acf3-ca11772b84ab', id from series
    where barcode = '4534943758095';

insert into variant (name, public_id, series_id)
    select 'くずきり', 'd5283c50-8fbe-4676-9c1c-a4184895a776', id from series
    where barcode = '4534943758095';
    