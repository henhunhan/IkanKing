const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userroutes');
const ikanRoutes = require('./routes/ikanroutes')

app.use(cors());
app.use(bodyParser.json());

// Menggunakan rute
app.use('/api/users', userRoutes); // Rute untuk pengguna
app.use('/api/', ikanRoutes);// Rute untuk ikan

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
