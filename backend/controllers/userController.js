const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Pastikan kita menggunakan koneksi database

// Controller untuk sign-up
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2)`,
      [email, hashedPassword]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Controller untuk login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Buat token dengan user_id di dalam payload
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Sign in successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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


// Mendapatkan keranjang berdasarkan user_id
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

exports.UpdateAlamatUser = async (req, res) => {
  const { alamat, kecamatan, kota } = req.body; // Tambahkan kecamatan dan kota
  const userId = req.user.user_id;

  try {
    await pool.query(
      'UPDATE users SET alamat = $1, kecamatan = $2, kota = $3 WHERE id = $4',
      [alamat, kecamatan, kota, userId]
    );
    res.status(200).json({ message: 'Alamat berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui alamat' });
  }
};


exports.UpdateUsername = async (req, res) => {
  const { username } = req.body;
  const userId = req.user.user_id;

  try {
    await pool.query('UPDATE users SET username = $1 WHERE id = $2', [username, userId]);
    res.status(200).json({ message: 'Username berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui username' });
  }
};


exports.GetUserProfile = async (req, res) => {
  const id = req.user.user_id;

  try {
    const result = await pool.query(
      'SELECT email, alamat, kecamatan, kota, username FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const user = result.rows[0];
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengguna.' });
  }
};















