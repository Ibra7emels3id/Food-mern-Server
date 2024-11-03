const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 }, 
            image:{ type: String, required: true},
        },
    ],
});

const CardModel = mongoose.model('Cart', cartSchema);

module.exports = CardModel;