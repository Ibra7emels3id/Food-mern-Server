const express = require('express');
const { PaymentConntrol, getCartPayment, getAllPayment, confirmPayment } = require('../controllers/PaymentConntroll');
const PaymentRouterClint = express.Router();

PaymentRouterClint.post('/create-payment-intent' , PaymentConntrol)
PaymentRouterClint.get('/get-payment-cart/:userId' , getCartPayment)
PaymentRouterClint.get('/get-all-payments' , getAllPayment)
PaymentRouterClint.put('/confirm-order/:id' , confirmPayment)



module.exports = PaymentRouterClint;