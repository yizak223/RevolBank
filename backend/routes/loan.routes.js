const { Router } = require('express')
const router = Router()
const { getLoans, createLoan } = require('../controllers/loan.controllers')
const { auth } = require('../middleware/auth')

let loans = []

router.get('/',auth,  getLoans)

router.post('/', auth, createLoan)

module.exports = router