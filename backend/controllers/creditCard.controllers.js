const { CreditCard } = require('../models/creditCard.model')
const { Account } = require('../models/account.model')
const generator = require('creditcard-generator')

const getCreditCard = async (req, res) => {
    try {
        const query = req.query;
        const creditCards = await CreditCard.find({ ...query })
        return res.send({ creditCards })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const createCreditCard = async (req, res) => {
    const body = req.body;
    try {
        const genArray = generator.GenCC('VISA')
        body.userId = body.idAccount
        const [accountGetCard] = await Promise.all([
            Account.findById(body.idAccount)
        ]);
        if (!accountGetCard) {
            return res.status(404).send("Account not found");
        }
        const newCreditCard = new CreditCard(body)
        newCreditCard.cardNumber = genArray[0]
        newCreditCard.numberAccount = accountGetCard.numberAccount;
        await newCreditCard.save()
        accountGetCard.creditCards.push(newCreditCard)
        await accountGetCard.save()
        res.send(newCreditCard)
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
const editCreditCard = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await CreditCard.findByIdAndUpdate(id, body)
        res.send({ msg: 'CreditCard updated' })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}


module.exports = { getCreditCard, createCreditCard, editCreditCard }