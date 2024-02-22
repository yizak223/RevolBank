const { Router } = require('express')
const router = Router()
const { getCreditCard, createCreditCard, editCreditCard } = require('../controllers/creditCard.controllers')
const { auth } = require('../middleware/auth')


const creditCards = []

router.get('/',auth, getCreditCard)
router.post('/', auth, createCreditCard)
router.patch('/:id', auth, editCreditCard)


module.exports = router