const { Expanse } = require('../models/expanses.model')
const { Account } = require('../models/account.model');
const schedule = require('node-schedule');

const getExpanses = async (req, res) => {
    try {
        const query = req.query;
        const expanses = await Expanse.find({ ...query })
        return res.send({ expanses })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}
const createExpenses = async () => {
    try {
        const job = schedule.scheduleJob(new Date(Date.now() + 1 * 60 * 1000), async function() {
            try {
                const accounts = await Account.find();
                for (const account of accounts) {
                    try {
                        const expense = new Expanse({
                            idAccount: account._id,
                            amount: 0,
                            month: new Date().getMonth() + 1
                        });
                        await expense.save();
                    } catch (err) {
                        console.error(`Error creating expense for account ${account._id}:`, err);
                    }
                }
                console.log('Expense entries created for all users after 5 minutes.');
            } catch (err) {
                console.error('Error retrieving user accounts:', err);
            }
        });

        console.log('Job scheduled to run after 5 minutes.');
    } catch (err) {
        console.error('Error scheduling the job:', err);
    }
};
createExpenses()
const editExpanses = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await Expanse.findByIdAndUpdate(id, body)
        res.send({ msg: 'Expanse updated' })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
module.exports = { getExpanses, editExpanses }