const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fullName: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    idIsraeli:{
        type:Number,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    loans:[{
        type: mongoose.Schema.Types.Object,
        ref: 'Loan'
    }],
    openedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    transactions: [{
        type: mongoose.Schema.Types.Object,
        ref: 'Transaction'
    }],
    securities: [{
        type: String, required: false
    }],
    creditCards: [{
        type: mongoose.Schema.Types.Object,
        ref: 'CreditCards'
    }],
    premium: {
        type: Boolean, required: false
    }
});
const Account = mongoose.model('Account', accountSchema)
module.exports = { Account }