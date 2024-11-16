const express = require('express');
const router = express.Router();
const { signup, login, AddtoKeranjang } = require('../controllers/userController');
const authtoken= require('../userauthtoken');

// Rute untuk sign-up
router.post('/signup', signup);

// Rute untuk login
router.post('/login', login);

router.post('/product/add', authtoken, AddtoKeranjang);

module.exports = router;
