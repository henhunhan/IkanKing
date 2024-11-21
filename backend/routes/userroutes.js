const express = require('express');
const router = express.Router();
const { signup, login, GetUserProfile, UpdateAlamatUser, UpdateUsername} = require('../controllers/userController');
const authtoken= require('../userauthtoken');

// Rute untuk sign-up
router.post('/signup', signup);

// Rute untuk login
router.post('/login', login);

router.get('/profile', authtoken, GetUserProfile);

router.put('/updatealamat', authtoken, UpdateAlamatUser);

router.put('/username', authtoken, UpdateUsername);
 

module.exports = router;
