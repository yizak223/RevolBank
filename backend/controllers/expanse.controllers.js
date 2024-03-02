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
const createExpanses =async()=>{
    try {
        const accounts = await Account.find();
        // const date = new Date(2024, 2, 1, 15, 2, 0);
        schedule.scheduleJob('0 0 1 * *', async function() {
            for (const account of accounts) {
                try {
                    const expanse = new Expanse({
                        idAccount: account._id,
                        amount: 0,
                        month: new Date().getMonth() + 1
                    });
                    await expanse.save();
                } catch (err) {
                    console.error(`Error creating expanse for account ${account._id}:`, err);
                }
            }
            console.log('expanse entries created for all users at the start of the month.');
        });
    } catch (err) {
        console.error('Error retrieving user accounts:', err);
    }
}
createExpanses()
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