const express = require('express');
const { PaymentConntrol, getCartPayment, getAllPayment, confirmPayment, deletePayment } = require('../controllers/PaymentConntroll');
const PaymentRouterClint = express.Router();

PaymentRouterClint.post('/create-payment-intent' , PaymentConntrol)
PaymentRouterClint.get('/get-payment-cart/:userId' , getCartPayment)
PaymentRouterClint.get('/get-all-payments' , getAllPayment)
PaymentRouterClint.put('/confirm-order/:id' , confirmPayment)
PaymentRouterClint.delete('/delete-order/:id' , deletePayment)




module.exports = PaymentRouterClint;