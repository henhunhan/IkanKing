-- Tabel Users
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY UNIQUE,
    alamat TEXT,
    username VARCHAR(50),
    kecamatan VARCHAR(50),
    kota VARCHAR(50),
    saldo INT
);

-- Tabel Ikan Konsumsi
CREATE TABLE IF NOT EXISTS ikankonsumsi (
    id UUID PRIMARY KEY NOT NULL,
    category VARCHAR(50),
    nama VARCHAR(100),
    harga NUMERIC(10, 2),
    kota VARCHAR(50),
    provinsi VARCHAR(50),
    gambar_url TEXT,
    delete_hash VARCHAR(50)
);

-- Tabel Ikan Hias
CREATE TABLE IF NOT EXISTS ikanhias (
    id UUID PRIMARY KEY NOT NULL,
    category VARCHAR(50),
    nama VARCHAR(100),
    harga NUMERIC(10, 2),
    kota VARCHAR(50),
    provinsi VARCHAR(50),
    gambar_url TEXT,
    delete_hash VARCHAR(50)
);

-- Tabel All Product
CREATE TABLE IF NOT EXISTS allproduct (
    product_id UUID PRIMARY KEY NOT NULL UNIQUE,
    category VARCHAR(50),
    nama VARCHAR(255) UNIQUE,
    harga NUMERIC(10, 2),
    kota VARCHAR(100),
    provinsi VARCHAR(100),
    gambar_url TEXT UNIQUE,
    delete_hash VARCHAR(50),
    tipe VARCHAR(50)
);

-- Tabel Jarak Kota
CREATE TABLE IF NOT EXISTS jarakkota (
    id SERIAL PRIMARY KEY,
    kota_pembeli VARCHAR(50),
    kota_penjual VARCHAR(50),
    jarak_km INT
);

-- Tabel Cart
CREATE TABLE IF NOT EXISTS cart (
    user_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INT NOT NULL,
    harga_total NUMERIC(10, 2) NOT NULL,
    nama_produk TEXT NOT NULL,
    image_url TEXT NOT NULL,
    lokasi_product TEXT,
    status TEXT DEFAULT 'pending',

    -- Foreign key constraints
    CONSTRAINT fk_idproduct FOREIGN KEY (product_id) 
        REFERENCES public.allproduct (product_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,

    CONSTRAINT fk_image FOREIGN KEY (image_url) 
        REFERENCES public.allproduct (gambar_url) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,

    CONSTRAINT fk_namaproduk FOREIGN KEY (nama_produk) 
        REFERENCES public.allproduct (nama) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,

    CONSTRAINT fk_user FOREIGN KEY (user_id) 
        REFERENCES public.users (id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,

    CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
);






INSERT INTO users (email, password, id, alamat, username, kecamatan, kota, saldo) VALUES
('jj@gmail.com', '$2a$10$0C6cIDe6Yotx8ZljzHOMEeRUgZdL8jc7mWGD5sw3r8OWtVfUyu3Ji', 'e993c4f1-b374-4cf9-af7a-c1a683f2f29d', 'Jalan keputih gang 1c no 9', 'Hendrik', 'Sukolilo', 'Surabaya', 2157110),
('polka123@gmail.com', '$2a$10$mG0eAcEMM/yet2Oxj6z1xuZxRMBXxMxxw3/MO879f3IqFI5V/Qy.a', 'ec6760b5-b6d8-4426-8315-86b778e1f4e2', 'Jalan Dharmahusada', 'hendri', 'Mulyorejo', 'Surabaya', 1222700);

INSERT INTO ikankonsumsi (id, category, nama, harga, kota, provinsi, gambar_url, delete_hash) VALUES
('11ca8f98-e6f1-4791-945e-1c22caeecdba', 'payau', 'Ikan Kakap Putih', 70000, 'Surakarta', 'Jawa Tengah', 'https://i.imgur.com/nBx9Dx7.jpeg', 'oNJSROhehP76EeZ'),
('1cb84fa5-b44b-4db9-98f1-52f2cee25e5a', 'tawar', 'Ikan Nila Merah', 58000, 'Depok', 'Jawa Barat', 'https://i.imgur.com/fx9s6si.jpeg', 'WHmsfdxI3D02W8j'),
('2cff7e71-306a-4521-8ef4-97ea37e051cd', 'payau', 'Ikan Belanak', 62500, 'Parepare', 'Sulawesi Selatan', 'https://i.imgur.com/pgL5D1z.jpeg', 'XS2a9bJmtuIDhZV'),
('30e2463c-bcd4-4dac-bbc9-9ef1fbdc4e47', 'laut', 'Ikan Tuna Sirip Kuning', 143000, 'Surabaya', 'Jawa Timur', 'https://i.imgur.com/L0bqpsD.jpeg', 'iAom5hjxBDWgkrZ'),
('3f8d85e9-6bce-41c4-8cc2-b08d48e52f78', 'tawar', 'Ikan Gurame', 55000, 'Magelang', 'Jawa Tengah', 'https://i.imgur.com/B9UTF6u.png', 'oP1f3bjmyAAjEAx'),
('4359457c-c096-465e-9ae8-ce4686bd2b54', 'laut', 'Ikan Bawal', 49000, 'Salatiga', 'Jawa Tengah', 'https://i.imgur.com/fWalCxP.jpeg', 'Doj3ToTQ9IbvLoy'),
('55677909-4635-43c2-8210-f1d8cde88cdc', 'laut', 'Ikan Sarden', 34000, 'Pekanbaru', 'Riau', 'https://i.imgur.com/YiRQHuA.jpeg', 'A4st8L2NyJ1gPyg'),
('740f992f-b822-4dcf-ad2a-874d6d75cf98', 'laut', 'Ikan Teri Basah 1kg enak murah', 45000, 'Denpasar', 'Bali', 'https://i.imgur.com/scbWwTY.jpeg', 'K1gUo9cmtK4Cj3Y'),
('7937a8ed-13cf-4b2f-8375-3cfde0aa1bbc', 'payau', 'Ikan Kerapu', 76500, 'Pariaman', 'Sumatra Barat', 'https://i.imgur.com/TvZQOWj.jpeg', 'CjuxrpDzb7XdvO0'),
('95bb6541-e5fe-4436-ae34-e95125c339cd', 'tawar', 'Ikan Lele', 38000, 'Makassar', 'Sulawesi Selatan', 'https://i.imgur.com/1eTMA3Y.png', 'Dzlrs7u0QlqgGAk'),
('a58a6ef2-ce9f-4bb3-86c2-a1f220706b29', 'laut', 'Ikan Tuna', 179000, 'Padang', 'Sumatra Barat', 'https://i.imgur.com/O5syxso.jpeg', 'IoUERftkbo3lzAL'),
('acc57218-7cf4-46b2-a118-c75bb6569095', 'tawar', 'Ikan Mujair', 40000, 'Salatiga', 'Jawa Tengah', 'https://i.imgur.com/pZDiYLj.jpeg', 'h9ykHAQWEVkdg6p'),
('b66e4ab2-3ea3-485b-aff2-47e3a3626a5c', 'tawar', 'Ikan Mas', 52900, 'Samarinda', 'Kalimantan Timur', 'https://i.imgur.com/aEppUHd.jpeg', 'NmS9cRxlYZqb96y'),
('ec6c1cce-cf34-4783-b8ea-ec017a269c85', 'payau', 'Ikan Bandeng', 69900, 'Banjarmasin', 'Kalimantan Selatan', 'https://i.imgur.com/9NDHW8A.jpeg', 'r5Hb0BmW9INpQFr');

INSERT INTO ikanhias (id, category, nama, harga, kota, provinsi, gambar_url, delete_hash) VALUES
('006635f9-a1e7-453a-b930-fb9455c4e474', 'laut', 'Lion Fish', 20000, 'Jakarta Selatan', 'Jakarta', 'https://i.imgur.com/DfTVcsc.jpeg', 'YAmE4o4Xi8iBiXB'),
('33b5a3cd-d914-42a2-bb81-964b26e70b1b', 'laut', 'Ikan Angel Kecil', 300000, 'Pontianak', 'Kalimantan Barat', 'https://i.imgur.com/1jMAb9G.jpeg', 'Sw0lyCZTNyux2Fh'),
('46cbd319-50ef-4447-8e94-a1b8403068b3', 'laut', 'Ikan Badut', 38000, 'Kendari', 'Sulawesi Tenggara', 'https://i.imgur.com/bSDnqkR.jpeg', '0zqUhwqt3sWqxjF'),
('5dfa891f-5cdb-4f2d-afbf-703098e97316', 'tawar', 'Ikan Cupang', 146000, 'Surabaya', 'Jawa Timur', 'https://i.imgur.com/zcoZ4n8.jpeg', '22Aopia28Cp187c'),
('72c996cd-f064-4b7a-899f-289645ee168e', 'tawar', 'Ikan Koi Kohaku', 160000, 'Bandung', 'Jawa Barat', 'https://i.imgur.com/CV83TLb.jpeg', 'P4eos82Je6zrQ4j'),
('7785b8cf-43ee-4f22-b823-a24d8f197b45', 'tawar', 'Ikan Mas Koki', 20000, 'Binjai', 'Sumatra Utara', 'https://i.imgur.com/xu6XRtZ.jpeg', 'g9ayk8wScz5W1PG'),
('84980199-a26f-4536-8fb8-af8b6f6b74c8', 'tawar', 'Ikan Neon Tetra', 2000, 'Depok', 'Jawa Barat', 'https://i.imgur.com/RKEjIaP.jpeg', 'Hl3iCOnjcJH5nRV'),
('a4e744b7-a0ad-4da8-afc8-e703e21549f6', 'tawar', 'Ikan Endler', 10101, 'Jakarta Pusat', 'Jakarta', 'https://i.imgur.com/rBYmjG3.jpeg', 'TlTaoZasxT5LT3p'),
('f7bc200a-4b61-409b-84e3-18294cca8777', 'tawar', 'Ikan Guppy', 5000, 'Medan', 'Sumatra Utara', 'https://i.imgur.com/1hDDNs0.jpeg', 'UHN9BgpYmC0xJlJ'),
('fd6783b6-2ec2-49ab-a000-6f7701f41761', 'laut', 'Butterfly Fish', 17500, 'Makassar', 'Sulawesi Selatan', 'https://i.imgur.com/dqewT7D.jpeg', 'Tpu6qQ7utiDCXwd');

INSERT INTO allproduct (product_id, category, nama, harga, kota, provinsi, gambar_url, delete_hash, tipe) VALUES
('006635f9-a1e7-453a-b930-fb9455c4e474', 'laut', 'Lion Fish', 20000, 'Jakarta Selatan', 'Jakarta', 'https://i.imgur.com/DfTVcsc.jpeg', 'YAmE4o4Xi8iBiXB', 'ikan-hias'),
('0f0d3f6e-f533-4a9d-97ce-4284824cc198', 'laut', 'Ikan Yellow Angel Keeper', 2622500, 'Jakarta Barat', 'Jakarta', 'https://i.imgur.com/foVwIzb.jpeg', 'PTEr8RsEzc0JTt5', 'ikan-hias'),
('11ca8f98-e6f1-4791-945e-1c22caeecdba', 'payau', 'Ikan Kakap Putih', 70000, 'Surakarta', 'Jawa Tengah', 'https://i.imgur.com/nBx9Dx7.jpeg', 'oNJSROhehP76EeZ', 'ikan-konsumsi'),
('1cb84fa5-b44b-4db9-98f1-52f2cee25e5a', 'tawar', 'Ikan Nila Merah', 58000, 'Depok', 'Jawa Barat', 'https://i.imgur.com/fx9s6si.jpeg', 'WHmsfdxI3D02W8j', 'ikan-konsumsi'),
('2cff7e71-306a-4521-8ef4-97ea37e051cd', 'payau', 'Ikan Belanak', 62500, 'Parepare', 'Sulawesi Selatan', 'https://i.imgur.com/pgL5D1z.jpeg', 'XS2a9bJmtuIDhZV', 'ikan-konsumsi'),
('30e2463c-bcd4-4dac-bbc9-9ef1fbdc4e47', 'laut', 'Ikan Tuna Sirip Kuning', 143000, 'Surabaya', 'Jawa Timur', 'https://i.imgur.com/L0bqpsD.jpeg', 'iAom5hjxBDWgkrZ', 'ikan-konsumsi'),
('33b5a3cd-d914-42a2-bb81-964b26e70b1b', 'laut', 'Ikan Angel Keeper', 300000, 'Pontianak', 'Kalimantan Barat', 'https://i.imgur.com/1jMAb9G.jpeg', 'Sw0IyCZTNyux2Fh', 'ikan-hias'),
('3f8d85e9-6bce-41c4-8cc2-b08d48e52f78', 'tawar', 'Ikan Gurame', 55000, 'Magelang', 'Jawa Tengah', 'https://i.imgur.com/B9UTF6u.png', 'oP1f3bjmyAAjEAx', 'ikan-konsumsi'),
('4359457c-c096-465e-9ae8-ce4686bd2b54', 'laut', 'Ikan Bawal', 49000, 'Salatiga', 'Jawa Tengah', 'https://i.imgur.com/fWalCxP.jpeg', 'Doj3ToTQ9IbvLoy', 'ikan-konsumsi'),
('46cbd319-50ef-4447-8e94-a1b8403068b3', 'laut', 'Ikan Badut', 38000, 'Kendari', 'Sulawesi Tenggara', 'https://i.imgur.com/bSDnqkR.jpeg', '0zqUhwqt3sWqxjF', 'ikan-hias'),
('55677909-4635-43c2-8210-f1d8cde88cdc', 'laut', 'Ikan Sarden', 34000, 'Pekanbaru', 'Riau', 'https://i.imgur.com/YiRQHuA.jpeg', 'A4st8L2NyJ1gPyg', 'ikan-konsumsi'),
('5dfa891f-5cd8-4f2d-abfb-703098e97316', 'tawar', 'Ikan Cupang HalfMoon', 146000, 'Surabaya', 'Jawa Timur', 'https://i.imgur.com/zcoZ4n8.jpeg', '22Aopia28Cp187c', 'ikan-hias'),
('72c996cd-f064-4b7a-899f-289645ee168e', 'tawar', 'Ikan Koi Kohaku A1', 160000, 'Bandung', 'Jawa Barat', 'https://i.imgur.com/CV83TLb.jpeg', 'P4eos82Je6zrQ4j', 'ikan-hias'),
('740f992f-b822-4dcf-ad2a-874d6d75cf98', 'laut', 'Ikan Teri Basah 1kg enak murah', 45000, 'Denpasar', 'Bali', 'https://i.imgur.com/scbWwTY.jpeg', 'K1gUo9cmtK4Cj3Y', 'ikan-konsumsi'),
('7785b8cf-43ee-4f22-b823-a24d81f97b45', 'tawar', 'Ikan Mas Koki', 20000, 'Binjai', 'Sumatra Utara', 'https://i.imgur.com/xu6XRtZ.jpeg', 'g9ayk8wScz5W1PG', 'ikan-hias'),
('7937a8ed-13cf-4b2f-8375-3cfde0aa1bbc', 'payau', 'Ikan Kerapu', 76500, 'Pariaman', 'Sumatra Barat', 'https://i.imgur.com/TvZQOWj.jpeg', 'CjuxrpDzb7XdvO0', 'ikan-konsumsi'),
('84980199-a26f-4536-8fb8-af8b6f6b74c8', 'tawar', 'Ikan Neon Tetra', 2000, 'Depok', 'Jawa Barat', 'https://i.imgur.com/RKEjIaP.jpeg', 'Hl3iCOnjcJH5nRV', 'ikan-hias'),
('95bb6541-e5fe-4436-ae34-e95125c339cd', 'tawar', 'Ikan Lele', 38000, 'Makassar', 'Sulawesi Selatan', 'https://i.imgur.com/1eTMA3Y.png', 'Dzlrs7u0QlqgGAk', 'ikan-konsumsi'),
('a4e744b7-a0ad-4da8-afc2-e703e21549f6', 'tawar', 'Ikan Endlers Livebearer', 10101, 'Jakarta Pusat', 'Jakarta', 'https://i.imgur.com/rBYmjG3.jpeg', 'TITaoZasxT5LT3p', 'ikan-hias'),
('a58a6ef2-ce9f-4bb3-86c2-a1f220706b29', 'laut', 'Ikan Tuna', 179000, 'Padang', 'Sumatra Barat', 'https://i.imgur.com/O5syxso.jpeg', 'IoUERftkbo3lzAL', 'ikan-konsumsi'),
('acc57218-7cf4-46b2-a118-c75bb6569095', 'tawar', 'Ikan Mujair', 40000, 'Salatiga', 'Jawa Tengah', 'https://i.imgur.com/pZDiYLj.jpeg', 'h9ykHAQWEVkdg6p', 'ikan-konsumsi'),
('b66e4ab2-3ea3-485b-aff2-47e3a3626a5c', 'tawar', 'Ikan Mas', 52900, 'Samarinda', 'Kalimantan Timur', 'https://i.imgur.com/aEppUHd.jpeg', 'NmS9cRxlYZqb96y', 'ikan-konsumsi'),
('ec6c1cce-cf34-4783-b8ea-ec017a269c85', 'payau', 'Ikan Bandeng', 69900, 'Banjarmasin', 'Kalimantan Selatan', 'https://i.imgur.com/9NDHW8A.jpeg', 'r5Hb0BmW9INpQFr', 'ikan-konsumsi'),
('f7bc200a-4b61-409b-84e3-1e8294cca877', 'tawar', 'Ikan Guppy Gold', 5000, 'Medan', 'Sumatra Utara', 'https://i.imgur.com/1hDDNs0.jpeg', 'UHN9BgpYmC0xJIJ', 'ikan-hias'), 
('fd6783b6-2ec2-49ab-a000-6f7701f41761', 'laut', 'Butterfly Fish', 17500, 'Makassar', 'Sulawesi Selatan', 'https://i.imgur.com/dqewT7D.jpeg', 'Tpu6qQ7utiDCXwd', 'ikan-hias');

INSERT INTO jarakkota (kota_pembeli, kota_penjual, jarak_km) VALUES
('Surabaya', 'Surabaya', 0),
('Surabaya', 'Makassar', 791),
('Surabaya', 'Banjarmasin', 489),
('Surabaya', 'Salatiga', 305),
('Surabaya', 'Magelang', 348),
('Surabaya', 'Samarinda', 906),
('Surabaya', 'Depok', 790),
('Surabaya', 'Pekanbaru', 1530),
('Surabaya', 'Surakarta', 257),
('Surabaya', 'Pariaman', 1583),
('Surabaya', 'Parepare', 842),
('Surabaya', 'Denpasar', 313),
('Surabaya', 'Pontianak', 889),
('Surabaya', 'Jakarta Barat', 759),
('Surabaya', 'Jakarta Selatan', 750),
('Surabaya', 'Bandung', 701),
('Surabaya', 'Jakarta Pusat', 783),
('Surabaya', 'Binjai', 1991),
('Surabaya', 'Kendari', 1139),
('Surabaya', 'Medan', 1975),
('Surabaya', 'Padang', 1543);

INSERT INTO cart (user_id, product_id, quantity, harga_total, nama_produk, image_url, lokasi_product, status)
VALUES
('ec6760b5-b6d8-4426-8315-86b778e1f4e2', '1cb84fa5-b44b-4db9-98f1-52f2cee25e5a', 1, 58000, 'Ikan Nila Merah', 'https://i.imgur.com/fx9s6si.jpeg', 'Depok', 'paid'),
('ec6760b5-b6d8-4426-8315-86b778e1f4e2', '72c996cd-f064-4b7a-899f-289645ee168e', 1, 160000, 'Ikan Koi Kohaku A1', 'https://i.imgur.com/CV83TLb.jpeg', 'Bandung', 'paid'),
('ec6760b5-b6d8-4426-8315-86b778e1f4e2', 'a58a6ef2-ce9f-4bb3-86c2-a1f220706b29', 3, 537000, 'Ikan Tuna', 'https://i.imgur.com/O5syxso.jpeg', 'Padang', 'paid'),
('e993c4f1-b374-4cf9-af7a-c1a683f2f29d', 'f7bc200a-4b61-409b-84e3-1e8294cca877', 2, 10000, 'Ikan Guppy Gold', 'https://i.imgur.com/1hDDNs0.jpeg', 'Medan', 'pending'),
('e993c4f1-b374-4cf9-af7a-c1a683f2f29d', '84980199-a26f-4536-8fb8-af8b6f6b74c8', 1, 2000, 'Ikan Neon Tetra', 'https://i.imgur.com/RKEjIaP.jpeg', 'Depok', 'pending'),
('e993c4f1-b374-4cf9-af7a-c1a683f2f29d', '0f0d3f6e-f533-4a9d-97ce-4284824cc198', 1, 2622500, 'Ikan Yellow Angel Keeper', 'https://i.imgur.com/foVwIzb.jpeg', 'Jakarta Barat', 'pending');




