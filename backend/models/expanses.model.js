const mongoose = require('mongoose')

const expanseScheme = new mongoose.Schema({
    idAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    amount: {
        type: Number, required: true, default: 0
    },
    month: {
        type: Number, // Store only the month number
        required: true,
        default: new Date().getMonth() + 1 // Get current month (1-based)
    }
})
const Expanse = mongoose.model('Expanse', expanseScheme)
module.exports = { Expanse }