const mongoose  = require('mongoose');

const OfferSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    discount:{
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    image:{
        type: String,
        required: true
    }
})

const Offers = mongoose.model('Offer', OfferSchema);

module.exports = Offers;