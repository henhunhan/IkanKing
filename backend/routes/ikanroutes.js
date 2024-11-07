const express = require('express');
const router = express.Router();
const getIkan = require('../controllers/IkanController');

// Rute untuk mendapatkan data ikan konsumsi
router.get('/ikankonsumsi', getIkan.getIkanKonsumsi);

router.get('/ikankonsumsi/:category', getIkan.getIkanKonsumsiByCategory);

router.get('/ikanhias',getIkan.getIkanHias );

router.get('/ikanhias/:category', getIkan.getIkanHiasByCategory);

module.exports = router;
