const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

// Rute untuk sign-up
router.post('/signup', signup);

// Rute untuk login
router.post('/login', login);

module.exports = router;
