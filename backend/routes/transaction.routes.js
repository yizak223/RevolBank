const { Router } = require('express')
const router = Router()
const { getTransactions, createTransactions } = require('../controllers/transaction.controllers')
const { auth } = require('../middleware/auth')

let transactions = []

router.get('/', auth, getTransactions)
router.post('/', auth, createTransactions)


module.exports = router