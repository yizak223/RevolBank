const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    fullName: {
        type: String, required: false
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String, required: true, default: 'user'
    }
})
const User = mongoose.model('User', userScheme)
module.exports = { User }