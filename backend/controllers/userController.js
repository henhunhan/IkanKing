const bcrypt = require('bcryptjs');
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

    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.AddtoKeranjang = async (req, res) => {
  const { user_id, product_id, quantity, harga_total } = req.body;

  try {
      // Insert item into cart, update if it already exists
      await pool.query(
          `INSERT INTO cart (user_id, product_id, quantity, harga_total)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (user_id, product_id)
           DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity,
                         harga_total = cart.harga_total + EXCLUDED.harga_total`,
          [user_id, product_id, quantity, harga_total]
      );
      res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ message: 'Error adding to cart' });
  }
};


