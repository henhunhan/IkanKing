const fs = require('fs');
const pool = require('./db'); // Sesuaikan path

const jsontopgsql = async () => {
    const data = require('./allikan.json'); // Path ke file JSON

    try {
        for (const item of data.ikan) {
            await pool.query(
                `INSERT INTO allproduct (product_id, category, nama, harga, kota, provinsi, gambar_url, tipe)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 ON CONFLICT (product_id) DO NOTHING`,
                [
                    item.product_id,
                    item.category,
                    item.nama,
                    item.harga,
                    item.kota,
                    item.provinsi,
                    item.images,
                    item.tipe
                ]
            );
        }
        console.log('Data JSON berhasil dimasukkan ke tabel allproduct.');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

jsontopgsql();
