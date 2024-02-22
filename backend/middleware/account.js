const { Account } = require('../models/account.model');

const getAccountId = async (req, res, next) => {
    try {
        // Assuming req.user.id contains the authenticated user's ID
        const account = await Account.findOne({ userId: req.user.id });
        if (!account) {
            return res.status(404).send("Account not found");
        }
        req.accountId = account._id;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

module.exports = { getAccountId };
