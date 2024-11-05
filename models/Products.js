const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    count: {
        type: Number,
    },
    category: {
        type: String,
    },
    categoryCanned: {
        type: String,
    },
    categoryFluidclass: {
        type: String,
    },
    image:{
        type: String,
        default: 'https://via.placeholder.com/300x300.jpg'
    },
    rating:{
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Products = mongoose.model('Product', productSchema);

module.exports = Products;