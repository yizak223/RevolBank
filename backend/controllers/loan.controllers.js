const { Loan } = require('../models/loan.model')
const { Account } = require('../models/account.model');

const getLoans = async (req, res) => {
    try {
        const query = req.query;
        const loans = await Loan.find({ ...query })
        return res.send({ loans })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const createLoan = async (req, res) => {
    const body = req.body;
    try {
        const loanAccountId = body.idAccount
        const [loanAccount] = await Promise.all([
            Account.findById(loanAccountId)
        ]);
        if (!loanAccount) {
            return res.status(404).send("Loan account not found");
        }
        const newLoan = new Loan(body);

        const today = new Date();
        const timeDiff = newLoan.dueDate.getTime() - today.getTime();
        const months = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30));
        console.log(months);
        const finalPayment = (newLoan.amount * 1.04) / months;
        console.log(finalPayment);

        newLoan.everyMonth = finalPayment
        loanAccount.balance += body.amount 
        loanAccount.loans.push(newLoan);
        await loanAccount.save();

        await newLoan.save();
        res.send({ newLoan });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { getLoans, createLoan }