const express = require('express');
const router = express.Router();
const getIkan = require('../controllers/IkanController');

// Rute untuk mendapatkan data ikan konsumsi
router.get('/ikankonsumsi', getIkan.getIkanKonsumsi);

router.get('/ikanhias',getIkan.getIkanHias );

module.exports = router;
