const { Account } = require('../models/account.model');
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
const getRecentTransactions = async (req, res) => {
    try {
        const query = req.query;
        const recentTransactions = await Transaction.find({ ...query }).sort({ createdAt: -1 }).limit(5);
        return res.send({ recentTransactions });
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
        const [senderAccount, recipientAccount] = await Promise.all([
            Account.findById(senderAccountId),
            Account.findById(recipientAccountId)
        ]);
        if (!senderAccount || !recipientAccount) {
            return res.status(404).send("Sender or recipient account not found");
        }
        const newTransaction = new Transaction(body);
        // newTransaction.status = "succeed";// need to confirm by sending

        senderAccount.balance -= Number(body.amount);
        newTransaction.type = "expenditure"
        senderAccount.transactions.push(newTransaction);
        await senderAccount.save();

        recipientAccount.balance += Number(body.amount);
        newTransaction.type = "income"
        recipientAccount.transactions.push(newTransaction);
        await recipientAccount.save();

        newTransaction.type = null
        await newTransaction.save();
        res.send({ newTransaction, senderAccount, recipientAccount });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};

module.exports = { getTransactions, createTransactions, getRecentTransactions }