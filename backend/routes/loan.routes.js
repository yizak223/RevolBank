const { Router } = require('express')
const router = Router()
const { getLoans, createLoan, getRecentLoans } = require('../controllers/loan.controllers')
const { auth } = require('../middleware/auth')

let loans = []

router.get('/', auth, getLoans)
router.get('/latestLoans', auth, getRecentLoans)


router.post('/', auth, createLoan)

module.exports = router