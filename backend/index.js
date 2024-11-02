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
    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, password]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah email ada di database
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Bandingkan password dengan hash yang tersimpan di database
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Jika cocok, kirimkan respons sukses
    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});



app.listen(5000, () => {
  console.log('Server running on port 5000');
});
