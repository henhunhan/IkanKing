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

-- Tabel All Product
CREATE TABLE IF NOT EXISTS allproduct (
    product_id UUID PRIMARY KEY NOT NULL UNIQUE,
    category VARCHAR(50),
    nama VARCHAR(255) UNIQUE,
    harga NUMERIC(10, 2),
    kota VARCHAR(100),
    provinsi VARCHAR(100),
    gambar_url TEXT UNIQUE,
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

INSERT INTO allproduct (product_id, category, nama, harga, kota, provinsi, gambar_url, tipe) VALUES
('006635f9-a1e7-453a-b930-fb9455c4e474', 'laut', 'Lion Fish', 20000, 'Jakarta Selatan', 'Jakarta', '/images/Ikan_Lion_Fish.jpg', 'ikan-hias'),
('0f0d3f6e-f533-4a9d-97ce-4284824cc198', 'laut', 'Ikan Yellow Angel Keeper', 2622500, 'Jakarta Barat', 'Jakarta', '/images/Ikan_Yellow_Angel_Keeper.jpeg', 'ikan-hias'),
('11ca8f98-e6f1-4791-945e-1c22caeecdba', 'payau', 'Ikan Kakap Putih', 70000, 'Surakarta', 'Jawa Tengah', '/images/Ikan_Kakap_Putih.jpg', 'ikan-konsumsi'),
('1cb84fa5-b44b-4db9-98f1-52f2cee25e5a', 'tawar', 'Ikan Nila Merah', 58000, 'Depok', 'Jawa Barat', '/images/Ikan_Nila_Merah.jpg', 'ikan-konsumsi'),
('2cff7e71-306a-4521-8ef4-97ea37e051cd', 'payau', 'Ikan Belanak', 62500, 'Parepare', 'Sulawesi Selatan', '/images/Ikan_Belanak.jpg','ikan-konsumsi'),
('30e2463c-bcd4-4dac-bbc9-9ef1fbdc4e47', 'laut', 'Ikan Tuna Sirip Kuning', 143000, 'Surabaya', 'Jawa Timur', '/images/Ikan_Tuna_Sirip_Kuning.jpg', 'ikan-konsumsi'),
('33b5a3cd-d914-42a2-bb81-964b26e70b1b', 'laut', 'Ikan Angel Keeper', 300000, 'Pontianak', 'Kalimantan Barat', '/images/Ikan_Angel_Keeper.jpg', 'ikan-hias'),
('3f8d85e9-6bce-41c4-8cc2-b08d48e52f78', 'tawar', 'Ikan Gurame', 55000, 'Magelang', 'Jawa Tengah', '/images/Ikan_Gurame.png', 'ikan-konsumsi'),
('4359457c-c096-465e-9ae8-ce4686bd2b54', 'laut', 'Ikan Bawal', 49000, 'Salatiga', 'Jawa Tengah', '/images/Ikan_Bawal.jpg', 'ikan-konsumsi'),
('46cbd319-50ef-4447-8e94-a1b8403068b3', 'laut', 'Ikan Badut', 38000, 'Kendari', 'Sulawesi Tenggara', '/images/Ikan_Badut.jpg', 'ikan-hias'),
('55677909-4635-43c2-8210-f1d8cde88cdc', 'laut', 'Ikan Sarden', 34000, 'Pekanbaru', 'Riau', '/images/Ikan_Sarden.jpg', 'ikan-konsumsi'),
('5dfa891f-5cd8-4f2d-abfb-703098e97316', 'tawar', 'Ikan Cupang HalfMoon', 146000, 'Surabaya', 'Jawa Timur', '/images/Ikan_Cupang_Half_Moon.jpg', 'ikan-hias'),
('72c996cd-f064-4b7a-899f-289645ee168e', 'tawar', 'Ikan Koi Kohaku A1', 160000, 'Bandung', 'Jawa Barat', '/images/Ikan_Koi_Kohaku_A1.jpg', 'ikan-hias'),
('740f992f-b822-4dcf-ad2a-874d6d75cf98', 'laut', 'Ikan Teri Basah 1kg enak murah', 45000, 'Denpasar', 'Bali', '/images/Ikan_Teri_Basah.jpg','ikan-konsumsi'),
('7785b8cf-43ee-4f22-b823-a24d81f97b45', 'tawar', 'Ikan Mas Koki', 20000, 'Binjai', 'Sumatra Utara', '/images/Ikan_Mas_Koki.jpg', 'ikan-hias'),
('7937a8ed-13cf-4b2f-8375-3cfde0aa1bbc', 'payau', 'Ikan Kerapu', 76500, 'Pariaman', 'Sumatra Barat', '/images/Ikan_Kerapu.jpg', 'ikan-konsumsi'),
('84980199-a26f-4536-8fb8-af8b6f6b74c8', 'tawar', 'Ikan Neon Tetra', 2000, 'Depok', 'Jawa Barat', '/images/Ikan_Neon_Tetra.jpg', 'ikan-hias'),
('95bb6541-e5fe-4436-ae34-e95125c339cd', 'tawar', 'Ikan Lele', 38000, 'Makassar', 'Sulawesi Selatan', '/images/Ikan_Lele.png', 'ikan-konsumsi'),
('a4e744b7-a0ad-4da8-afc2-e703e21549f6', 'tawar', 'Ikan Endlers Livebearer', 10101, 'Jakarta Pusat', 'Jakarta', '/images/Ikan_Endlers_Livebearer.jpg','ikan-hias'),
('a58a6ef2-ce9f-4bb3-86c2-a1f220706b29', 'laut', 'Ikan Tuna', 179000, 'Padang', 'Sumatra Barat', '/images/Ikan_Tuna.jpg', 'ikan-konsumsi'),
('acc57218-7cf4-46b2-a118-c75bb6569095', 'tawar', 'Ikan Mujair', 40000, 'Salatiga', 'Jawa Tengah', '/images/Ikan_Mujair.jpg', 'ikan-konsumsi'),
('b66e4ab2-3ea3-485b-aff2-47e3a3626a5c', 'tawar', 'Ikan Mas', 52900, 'Samarinda', 'Kalimantan Timur', '/images/Ikan_Mas.jpg', 'ikan-konsumsi'),
('ec6c1cce-cf34-4783-b8ea-ec017a269c85', 'payau', 'Ikan Bandeng', 69900, 'Banjarmasin', 'Kalimantan Selatan', '/images/Ikan_Bandeng.jpg', 'ikan-konsumsi'),
('f7bc200a-4b61-409b-84e3-1e8294cca877', 'tawar', 'Ikan Guppy Gold', 5000, 'Medan', 'Sumatra Utara', '/images/Ikan_Guppy_Gold.jpg', 'ikan-hias'), 
('fd6783b6-2ec2-49ab-a000-6f7701f41761', 'laut', 'Butterfly Fish', 17500, 'Makassar', 'Sulawesi Selatan', '/images/Ikan_Butterfly_Fish.jpg', 'ikan-hias');

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





