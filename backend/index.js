// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'IkanKing',
  password: 'Ardthian123',
  port: 5943,
});

// Endpoint untuk sign-up
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah salt rounds

    // Simpan email dan hashed password di database
    await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2)`,
      [email, hashedPassword]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Endpoint untuk login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah email ada di database
    const userResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Bandingkan password dengan hash yang tersimpan di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Jika cocok, kirimkan respons sukses
    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
