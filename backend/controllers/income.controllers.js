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
const createIncomes = async () => {
    try {
        // Schedule the job to run at midnight on the 1st of every month
        schedule.scheduleJob('0 0 1 * *', async function() {
            try {
                const accounts = await Account.find(); 
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
            } catch (err) {
                console.error('Error retrieving user accounts within the scheduled job:', err);
            }
        });

        console.log('Job scheduled to run at midnight on the 1st of every month.');
    } catch (err) {
        console.error('Error scheduling the job:', err);
    }
};
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