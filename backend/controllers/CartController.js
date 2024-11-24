const pool = require('../db'); // Pastikan kita menggunakan koneksi database
const axios = require('axios');
const ONGKOS_PER_KM = 20;

exports.AddtoKeranjang = async (req, res) => {
  const { product_id, quantity, harga_total } = req.body;

  try {
      const user_id = req.user.user_id;

      // Ambil nama produk, gambar_url, dan lokasi (kota) berdasarkan product_id
      const productResult = await pool.query(
          `SELECT nama, gambar_url, kota FROM allproduct WHERE product_id = $1`,
          [product_id]
      );

      const nama_produk = productResult.rows[0]?.nama;
      const image_url = productResult.rows[0]?.gambar_url;
      const lokasi_product = productResult.rows[0]?.kota;


      if (!nama_produk || !image_url || !lokasi_product) {
          return res.status(404).json({ error: 'Product not found, image URL or location missing' });
      }

      // Simpan data ke tabel cart
      await pool.query(
          `INSERT INTO cart (user_id, product_id, quantity, harga_total, nama_produk, image_url, lokasi_product)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (user_id, product_id)
          DO UPDATE SET 
              quantity = cart.quantity + $3, 
              harga_total = cart.harga_total + $4,
              nama_produk = $5,
              image_url = $6,
              lokasi_product = $7`,
          [user_id, product_id, quantity, harga_total, nama_produk, image_url, lokasi_product]
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
    try {
        const { product_id, kota_pembeli } = req.body;

        // Validasi input
        if (!product_id || !kota_pembeli) {
            return res.status(400).json({ message: "Product ID dan kota pembeli harus diisi." });
        }

        // Ambil lokasi kota penjual dari tabel all_product
        const productResult = await pool.query(
            `SELECT kota FROM allproduct WHERE product_id = $1`,
            [product_id]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({ message: "Produk tidak ditemukan." });
        }

        const kota_penjual = productResult.rows[0].kota;

        // Ambil jarak antar kota dari tabel jarakkota
        const query = `
          SELECT jarak_km 
          FROM jarakkota 
          WHERE kota_pembeli = $1 AND kota_penjual = $2
        `;
        const result = await pool.query(query, [kota_pembeli, kota_penjual]);

        // Validasi jika jarak tidak ditemukan
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: `Jarak antara ${kota_pembeli} dan ${kota_penjual} tidak ditemukan.`,
            });
        }

        const distance = parseFloat(result.rows[0].jarak_km);

        // Validasi jika distance tidak valid
        if (isNaN(distance) || distance <= 0) {
            return res.status(400).json({
                message: "Jarak tidak valid. Pastikan data jarak dalam database benar.",
            });
        }

        // Hitung ongkos kirim (asumsi biaya tetap per km)
        const deliveryCost = distance * ONGKOS_PER_KM;

        // Validasi deliveryCost jika tidak valid
        if (isNaN(deliveryCost) || deliveryCost <= 0) {
            return res.status(400).json({
                message: "Ongkos kirim tidak valid. Pastikan data biaya per km benar.",
            });
        }

        // Respon hasil dengan `deliveryCost` sebagai angka
        res.status(200).json({
            kota_pembeli,
            kota_penjual,
            distance: `${distance} km`,
            deliveryCost, // Kirim sebagai angka tanpa format string
        });
    } catch (error) {
        console.error("Error menghitung ongkos kirim:", error.message);
        res.status(500).json({ message: "Gagal menghitung ongkos kirim" });
    }
};

