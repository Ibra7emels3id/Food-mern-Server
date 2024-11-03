const mongoose = require('mongoose');

const ReviewSChema = new mongoose.Schema({
    name: {
        type: String,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
        default: '',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Review = mongoose.model('Review', ReviewSChema);
module.exports = Review;