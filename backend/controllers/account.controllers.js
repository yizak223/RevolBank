const { Account } = require('../models/account.model')

const getAccounts = async (req, res) => {
    try {
        const query = req.query;
        const accounts = await Account.find({ ...query })
        return res.send({ accounts })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const getAccountSingle = async (req, res) => {
    const id = req.params.id;
    try {
        const account = await Account.findById(id)
        res.send({ account })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
const createAccount = async (req, res) => {
    const body = req.body;
    try {
        console.log(req.user);
        body.userId = req.user.id
        const newAccount = new Account(body)
        await newAccount.save()
        res.send({ newAccount })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
const editAccount = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await Account.findByIdAndUpdate(id, body)
        res.send({ msg: 'Account updated' })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { getAccounts, getAccountSingle, createAccount, editAccount }