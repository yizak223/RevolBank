const { Router } = require('express')
const router = Router()
const { getTransactions, createTransactions,getRecentTransactions } = require('../controllers/transaction.controllers')
const { auth } = require('../middleware/auth')

let transactions = []

router.get('/', auth, getTransactions)
router.get('/latestTransactions', auth, getRecentTransactions)
router.post('/', auth, createTransactions)


module.exports = router