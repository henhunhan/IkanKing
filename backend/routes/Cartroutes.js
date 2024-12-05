const express = require('express');
const router = express.Router();
const{ AddtoKeranjang, CartList, deleteCartItem, getDeliveryCost, checkoutCart, setCartPending} = require('../controllers/CartController');
const authtoken= require('../userauthtoken');


router.get('/', authtoken, CartList);

router.post('/add', authtoken, AddtoKeranjang);

router.put('/:productId', authtoken, deleteCartItem);

router.post("/calculatedeliverycost", getDeliveryCost);  

router.post('/checkout', authtoken, checkoutCart);

router.post('/setpending', authtoken, setCartPending);

module.exports = router;