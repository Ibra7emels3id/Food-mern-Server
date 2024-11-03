const { default: mongoose } = require('mongoose');
const sendEmail = require('../Email/SendEmail');
const CardModel = require('../models/Cart');
const CartPay = require('../models/CartPayment');

// Payment STRIPE
const stripe = require('stripe')('sk_test_51PDqAJP7DuJ1bxg98QMZ7sMJtpg3SxWCzeGcqAk7XIs4g2tQuz1YSKQRmqf1o9UdpZjDqhAfs6FIrLNCYn4GQ9iE004h3sBMlP');

const PaymentConntrol = async (req, res, next) => {
    const { amount, currency, CartID, items, phone, address, tex, discount, email, CartName, name, userId } = req.body;
    console.log({ amount, currency, items, phone, address, tex, discount, email, CartName, name, userId });
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency,
            payment_method_types: ['card'],
            metadata: {
                items: JSON.stringify(items),
                name,
                CartName,
                phone,
                address,
                totalPrice: amount,
                tex,
                discount: discount,
                email,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString(),
            },
        });

        const payment = new CartPay({
            paymentId: paymentIntent.id,
            subTotal: amount,
            currency,
            items,
            name,
            userId,
            CartName,
            phone,
            address,
            tex,
            discount,
            email,
            status: 'pending',
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString(),
        })

        await payment.save();


        // Remove Cart
        const cart = await CardModel.findByIdAndDelete(CartID);
        console.log('Cart removed:', cart);

        // Send email details Payment 
        sendEmail(email, paymentIntent);

        res.status(200).json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ message: 'Payment failed' });
    }
}

// Get Cart Payment
const getCartPayment = async (req, res, next) => {
    try {
        const payment = await CartPay.find({ userId: req.params.userId });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error('Error getting payment:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get All Payment
const getAllPayment = async (req, res, next) => {
    try {
        const payment = await CartPay.find({});
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error getting payment:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Confirm Payment Order

const confirmPayment = async (req, res, next) => {
    try {
        const payment = await CartPay.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        const updatedStatus = payment.status === 'pending' ? 'out for delivery' : 'complete';

        const updatedPayment = await CartPay.findByIdAndUpdate(
            req.params.id,
            { status: updatedStatus },
            { new: true }
        );

        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    PaymentConntrol,
    getCartPayment,
    getAllPayment,
    confirmPayment,
}