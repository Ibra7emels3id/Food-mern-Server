const express = require('express');
const { Cards, getCart, removeFromCart, deleteToCart, } = require('../controllers/CartControll');

const CarRouterClint = express.Router();

CarRouterClint.post('/cart', Cards)
CarRouterClint.get('/cart', getCart)
CarRouterClint.post('/cart-remove', removeFromCart)
CarRouterClint.put('/cart-delete-item', deleteToCart)






module.exports = CarRouterClint;
