const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userroutes');
const ikanRoutes = require('./routes/ikanroutes');
const CartRoutes = require('./routes/Cartroutes');

const corsOptions = {
  origin: 'http://localhost:3000', // Ganti dengan domain frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metode yang diizinkan
  allowedHeaders: ['Authorization', 'Content-Type'], // Header yang diizinkan
  Credentials: true,
};

// Konfigurasi CORS untuk mengizinkan akses dari Nginx
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Menggunakan rute
app.use('/api/users', userRoutes); // Rute untuk pengguna
app.use('/api/', ikanRoutes);      // Rute untuk ikan
app.use('/api/cart', CartRoutes);  // Rute untuk keranjang

// Jalankan server pada port 5000
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
