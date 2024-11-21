const express = require('express');
const router = express.Router();
const{ AddtoKeranjang, CartList, deleteCartItem, getDeliveryCost} = require('../controllers/CartController');
const authtoken= require('../userauthtoken');


router.get('/', authtoken, CartList);

router.post('/add', authtoken, AddtoKeranjang);

router.put('/:productId', authtoken, deleteCartItem);

router.post("/calculatedeliverycost", getDeliveryCost);  

module.exports = router;