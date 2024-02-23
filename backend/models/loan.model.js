const mongoose = require('mongoose')

const loanScheme = new mongoose.Schema({
    idAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    amount: {
        type: Number, required: true
    },
    finalAmount: {
        type: Number, required: true
    },
    dueDate: {
        type: Date, required: true,
        default: () => {
            const today = new Date();
            const twoMonthsLater = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
            return twoMonthsLater;
        }
    },
    interest: {
        type: Number, required: true, default: 0.4
    },
    everyMonth: {
        type: String, required: false
    },
    status: {
        type: String, required: true, default: 'pending'
    },
    createdAt: {
        type: Date, required: true, default: Date.now
    }
})
const Loan = mongoose.model('Loan', loanScheme)
module.exports = { Loan }