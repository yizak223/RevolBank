const { Loan } = require('../models/loan.model')
const { Account } = require('../models/account.model');
const { Income } = require('../models/income.model');

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

const getRecentLoans = async (req, res) => {
    try {
        const query = req.query;
        const recentLoans = await Loan.find({ ...query }).sort({ createdAt: -1 }).limit(5);
        return res.send({ recentLoans });
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const createLoan = async (req, res) => {
    const body = req.body;
    try {
        const loanAccountId = body.idAccount;
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
        const finalPayment = (newLoan.amount * 1.04) / months;
        newLoan.everyMonth = finalPayment;

        // Update loan account balance
        loanAccount.balance += Number(body.amount);
        loanAccount.loans.push(newLoan);

        // Calculate interest income generated by the loan
        // const interestIncome = newLoan.amount;

        // Find the existing monthly income entry for the relevant account and month
        const existingIncomeEntry = await Income.findOne({
            idAccount: loanAccountId,
            month: today.getMonth() + 1 // Assuming the month is stored as 1-based index
        });

        if (existingIncomeEntry) {
            // Update the amount field of the existing income entry
            existingIncomeEntry.amount += newLoan.amount;
            await existingIncomeEntry.save();
        } else {
            // Create a new income entry for the interest income if one doesn't exist
            const interestIncomeEntry = new Income({
                idAccount: loanAccountId,
                amount: interestIncome,
                month: today.getMonth() + 1 // Store the current month
            });
            await interestIncomeEntry.save();
        }

        await Promise.all([
            loanAccount.save(),
            newLoan.save()
        ]);

        res.send({ newLoan });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { getLoans, createLoan, getRecentLoans }