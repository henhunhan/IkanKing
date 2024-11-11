const express = require('express');
const router = express.Router();
const getIkan = require('../controllers/IkanController');

// Rute untuk mendapatkan data ikan konsumsi
router.get('/ikankonsumsi', getIkan.getIkanKonsumsi);

router.get('/ikankonsumsi/category/:category', getIkan.getIkanKonsumsiByCategory);

router.get('/ikankonsumsi/product/:id', getIkan.getIkanKonsumsiById);

router.get('/ikanhias',getIkan.getIkanHias );

router.get('/ikanhias/category/:category', getIkan.getIkanHiasByCategory);

router.get('/ikanhias/product/:id', getIkan.getIkanHiasById);

module.exports = router;
