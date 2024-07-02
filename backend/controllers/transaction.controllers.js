const { Account } = require('../models/account.model');
const { Expanse } = require('../models/expanses.model');
const { Income } = require('../models/income.model');
const { Transaction } = require('../models/transaction.model')

const getTransactions = async (req, res) => {
    try {
        const query = req.query;
        const transactions = await Transaction.find({ ...query })
        return res.send({ transactions })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const createTransactions = async (req, res) => {
    const body = req.body;
    try {
        const senderAccountId = body.from;
        const recipientAccountId = body.to;
        const amount = Number(body.amount);

        const [senderAccount, recipientAccount] = await Promise.all([
            Account.findById(senderAccountId),
            Account.findById(recipientAccountId)
        ]);
        if (!senderAccount || !recipientAccount) {
            return res.status(404).send("Sender or recipient account not found");
        }
        const newTransaction = new Transaction(body);
        // newTransaction.status = "succeed";// need to confirm by sending

        senderAccount.balance -= amount
        const expenditureTransaction = new Transaction({
            ...body,
            type: "expenditure"
        });
        senderAccount.transactions.push(expenditureTransaction);

        recipientAccount.balance += amount
        const incomeTransaction = new Transaction({
            ...body,
            type: "income"
        });
        recipientAccount.transactions.push(incomeTransaction);

        const currentMonth = new Date().getMonth() + 1;

        // Update or create income entry for the recipient account
        let recipientIncomeEntry = await Income.findOneAndUpdate(
            { idAccount: recipientAccountId, month: currentMonth },
            { $inc: { amount: amount } },
            { new: true }
        );
        if (!recipientIncomeEntry) {
            recipientIncomeEntry = new Income({
                idAccount: recipientAccountId,
                amount: amount,
                month: currentMonth
            });
            await recipientIncomeEntry.save();
        }

        // Update or create expense entry for the sender account
        let senderExpenseEntry = await Expanse.findOneAndUpdate(
            { idAccount: senderAccountId, month: currentMonth },
            { $inc: { amount: amount } },
            { new: true }
        );
        if (!senderExpenseEntry) {
            senderExpenseEntry = new Expanse({
                idAccount: senderAccountId,
                amount: amount,
                month: currentMonth
            });
            await senderExpenseEntry.save();
        }
        newTransaction.type = null

        await Promise.all([
            senderAccount.save(),
            recipientAccount.save(),
            expenditureTransaction.save(),
            incomeTransaction.save(),
            newTransaction.save()
        ]);

        res.send({ newTransaction, senderAccount, recipientAccount });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};

module.exports = { getTransactions, createTransactions }