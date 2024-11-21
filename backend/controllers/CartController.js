const pool = require('../db'); // Pastikan kita menggunakan koneksi database
const axios = require('axios');

exports.AddtoKeranjang = async (req, res) => {
    const { product_id, quantity, harga_total } = req.body;
  
    try {
        const user_id = req.user.user_id;
  
        // Ambil nama produk dan image_url berdasarkan product_id
        const productResult = await pool.query(
            `SELECT nama, gambar_url FROM allproduct WHERE product_id = $1`,
            [product_id]
        );
  
        const nama_produk = productResult.rows[0]?.nama;
        const image_url = productResult.rows[0]?.gambar_url;
  
        if (!nama_produk || !image_url) {
            return res.status(404).json({ error: 'Product not found or image URL missing' });
        }
  
        // Simpan data ke tabel cart
        await pool.query(
            `INSERT INTO cart (user_id, product_id, quantity, harga_total, nama_produk, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (user_id, product_id)
            DO UPDATE SET 
                quantity = cart.quantity + $3, 
                harga_total = cart.harga_total + $4,
                nama_produk = $5,
                image_url = $6`,
            [user_id, product_id, quantity, harga_total, nama_produk, image_url]
        );
  
        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.CartList = async (req, res) => {
    try {
      const user_id = req.user.user_id; // Ambil user_id dari token autentikasi
  
      const query = `
        SELECT 
          product_id,
          nama_produk,
          quantity,
          harga_total,
          image_url
        FROM cart
        WHERE user_id = $1
      `;
  
      const { rows } = await pool.query(query, [user_id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Keranjang kosong" });
      }
  
      res.json(rows);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.deleteCartItem = async (req, res) => {
    try {
        const { productId } = req.params; // Mendapatkan ID produk dari parameter URL
        const userId = req.user.user_id; // Mendapatkan ID user dari token (dari middleware auth)
  
        // Periksa apakah item ada di keranjang user
        const cartItem = await pool.query(
            "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
            [userId, productId]
        );
  
        if (cartItem.rows.length === 0) {
            return res.status(404).json({ message: "Item tidak ditemukan di keranjang Anda." });
        }
  
        const currentQuantity = cartItem.rows[0].quantity;
  
        if (currentQuantity > 1) {
            // Jika jumlah barang lebih dari 1, kurangi jumlahnya
            const newQuantity = currentQuantity - 1;
            const newTotalPrice = newQuantity * cartItem.rows[0].harga_total / currentQuantity;
  
            await pool.query(
                "UPDATE cart SET quantity = $1, harga_total = $2 WHERE user_id = $3 AND product_id = $4",
                [newQuantity, newTotalPrice, userId, productId]
            );
  
            return res.status(200).json({
                message: "Jumlah item berhasil dikurangi.",
                updatedItem: {
                    product_id: productId,
                    quantity: newQuantity,
                    harga_total: newTotalPrice
                },
            });
        } else {
            // Jika jumlah barang 1, hapus item dari keranjang
            await pool.query(
                "DELETE FROM cart WHERE user_id = $1 AND product_id = $2",
                [userId, productId]
            );
  
            return res.status(200).json({ message: "Item berhasil dihapus dari keranjang." });
        }
    } catch (error) {
        console.error("Error updating or deleting cart item:", error);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  };

  exports.getDeliveryCost = async (req, res) => {
    const { lokasiProduk, lokasiPembeli } = req.body;
  
    try {
        // Mendapatkan koordinat lokasi produk
        const lokasiProdukResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: lokasiProduk,
                format: "json",
            },
            headers: {
              "User-Agent": "IkanKing",
          },
        });
  
        const lokasiPembeliResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: lokasiPembeli,
                format: "json",
            },
            headers: {
              "User-Agent": "IkanKing",
          },
        });
  
        const lokasiProdukData = lokasiProdukResponse.data[0];
        const lokasiPembeliData = lokasiPembeliResponse.data[0];
  
        if (!lokasiProdukData || !lokasiPembeliData) {
            return res.status(400).json({ message: "Lokasi tidak valid" });
        }
  
        const { lat: latProduk, lon: lonProduk } = lokasiProdukData;
        const { lat: latPembeli, lon: lonPembeli } = lokasiPembeliData;
  
        console.log(`Koordinat Produk: ${latProduk}, ${lonProduk}`);
        console.log(`Koordinat Pembeli: ${latPembeli}, ${lonPembeli}`);
  
        // Haversine Formula untuk menghitung jarak
        const toRadians = (degree) => (degree * Math.PI) / 180;
        const earthRadius = 6371; // Radius bumi dalam km
  
        const dLat = toRadians(latPembeli - latProduk);
        const dLon = toRadians(lonPembeli - lonProduk);
  
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(latProduk)) *
                Math.cos(toRadians(latPembeli)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c; // Jarak dalam km
  
        console.log(`Jarak Dihitung: ${distance} km`);
  
        // Kalkulasi harga kirim
        const hargaPerKm = 5000; // Rp. 5.000 per km
        const totalHarga = Math.ceil(distance) * hargaPerKm;
  
        console.log(`Total Harga Kirim: Rp. ${totalHarga}`);
        res.status(200).json({ distance: distance.toFixed(2), totalHarga });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Gagal menghitung harga kirim" });
    }
  };