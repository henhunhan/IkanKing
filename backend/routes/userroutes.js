const express = require('express');
const router = express.Router();
const { signup, login, AddtoKeranjang, CartList, GetUserProfile, UpdateAlamatUser, UpdateUsername, deleteCartItem} = require('../controllers/userController');
const authtoken= require('../userauthtoken');

// Rute untuk sign-up
router.post('/signup', signup);

// Rute untuk login
router.post('/login', login);

router.post('/product/add', authtoken, AddtoKeranjang);

router.get('/cart', authtoken, CartList);

router.get('/profile', authtoken, GetUserProfile);

router.put('/updatealamat', authtoken, UpdateAlamatUser);

router.put('/username', authtoken, UpdateUsername);

router.put('/:productId', authtoken, deleteCartItem);

module.exports = router;
