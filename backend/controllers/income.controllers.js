const { Income } = require('../models/income.model')
const { Account } = require('../models/account.model');
const schedule = require('node-schedule');

const getIncomes = async (req, res) => {
    try {
        const query = req.query;
        const incomes = await Income.find({ ...query })
        return res.send({ incomes })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}
const createIncomes =async()=>{
    try {
        const accounts = await Account.find();
        // const date = new Date(2024, 2, 1, 14, 58, 40);
        schedule.scheduleJob('0 0 1 * *', async function() {
            for (const account of accounts) {
                try {
                    const income = new Income({
                        idAccount: account._id,
                        amount: 0,
                        month: new Date().getMonth() + 1
                    });
                    await income.save();
                } catch (err) {
                    console.error(`Error creating income for account ${account._id}:`, err);
                }
            }
            console.log('Income entries created for all users at the start of the month.');
        });
    } catch (err) {
        console.error('Error retrieving user accounts:', err);
    }
}
createIncomes()
const editIncomes = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const income = await Income.findByIdAndUpdate(id, body, { new: true })
        return res.send({ income })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}
module.exports = { getIncomes , editIncomes }