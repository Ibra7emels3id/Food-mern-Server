const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true

    },
    email: {
        type: String,
        unique: true,
        // required: true

    },
    password: {
        type: String,
        // required: true
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isBlock:{
        type: Boolean,
        default: false
    },
    image:{
        type: String,
        default: ''
    },
    phone:{
        type: String,
        unique: true,
        default: '0123456789'
    },
    address:{
        type: String,
        default: 'No Address'
    },
    city:{
        type: String,
        default: 'No City'
    },
    country:{
        type: String,
        default: 'No Country'
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },
    lastLogout:{
        type: Date,
        default: null
    },
    lastPasswordReset:{
        type: Date,
        default: null
    },
    zip:{
        type: String,
        default: 'No Zip'
    }
})


const User = mongoose.model('User', UserSchema);

module.exports = User;