const { Router } = require('express')
const router = Router()
const { getIncomes, editIncomes } = require('../controllers/income.controllers')
const { auth, authorize } = require('../middleware/auth')


let incomes = []
router.get('/', auth, getIncomes)
router.patch('/', auth, editIncomes)

module.exports = router