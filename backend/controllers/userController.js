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
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '' });

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
    const { userId } = req.params;

    const query = `
      SELECT 
        nama_produk,
        harga_satuan,
        quantity,
        harga_total,
        image_url
      FROM cart
      WHERE user_id = $1
    `;

    const { rows } = await pool.query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};










