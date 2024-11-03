const mongoose = require('mongoose');

const CartPaySchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User'
    },
    subTotal: {
        type: Number,
    },
    email: {
        type: String,
    },
    items: {
        type: Array,
    },
    paymentId: {
        type: String,
    },
    address: {
        type: String,
    },
    phone:{
        type: String,
    },
    name: {
        type: String,
    },
    CartName: {
        type: String,
    },
    discount: {
        type: Number,
        default: 0
    },
    tex: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    currency:{
        type: String,
        default: 'USD'
    },
    date:{
        type: Date,
        default: Date.now
    },
    time:{
        type: String,
        default: '00:00:00'
    },
    status: {
        type: String,
        default: 'pending'
    }
})

const CartPay = mongoose.model('CartPay', CartPaySchema);

module.exports = CartPay;