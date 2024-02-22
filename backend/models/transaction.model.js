const mongoose = require('mongoose')

const tansactionScheme = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    status: {
        type: String, required: true, default: 'pending'
    },
    amount: {
        type: Number, required: true
    },
    type:{
        type: String, required: false
    }
})
const Transaction = mongoose.model('Transaction', tansactionScheme)
module.exports = { Transaction }