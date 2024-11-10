const mongoose = require('mongoose')

const BannersSchema = new mongoose.Schema({
    imageBig: String,
    titleBig: String,
    aboutBig: String,
    descriptionBig: String,

    imageSmall: String,
    titleSmall: String,
    aboutSmall: String,
    descriptionSmall: String,

    imageMedium: String,
    titleMedium: String,
    aboutMedium: String,
    descriptionMedium: String,
    
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const Banners = mongoose.model('Banner', BannersSchema)

module.exports = Banners