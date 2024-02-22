const mongoose = require('mongoose')
const creditCardScheme = new mongoose.Schema({
    idAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    cardNumber: {
        type: Number, required: true
    },
    cvv: {
        type: Number, required: true, default: () => {
            return Math.floor(100 + Math.random() * 900);
        }
    },
    expirationDate: {
        type: Date, required: true, default: () => {
            const currDate = new Date()
            currDate.setFullYear(currDate.getFullYear() + 5)
            return currDate
        }
    },
    limit: {
        type: Number, required: true, default: 4000
    },
    expanses: {
        type: Number, required: false
    },
    isActive: {
        type: Boolean, required: true, default: true
    }
})
const CreditCard = mongoose.model('CreditCard', creditCardScheme)
module.exports = { CreditCard }