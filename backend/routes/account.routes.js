const { Router } = require('express')
const router = Router()
const { Account } = require('../models/account.model')
const { getAccounts, createAccount, editAccount, getAccountSingle ,getAccountRecentTransaction } = require('../controllers/account.controllers')
const { auth } = require('../middleware/auth')


let accounts = []
router.get('/', auth, getAccounts)
router.get('/:id', auth, getAccountSingle)
router.get('/:id/recentTransaction', auth, getAccountRecentTransaction)

router.post('/', auth, createAccount)
router.patch('/:id', auth, editAccount)

module.exports = router