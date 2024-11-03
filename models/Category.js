const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true, unique: true },
    image: { type: String }
})

const Category = mongoose.model('Categoryy', CategorySchema)

module.exports = Category