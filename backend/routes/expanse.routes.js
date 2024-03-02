const { Router } = require('express')
const router = Router()
const { getExpanses, editExpanses } = require('../controllers/expanse.controllers')
const { auth, authorize } = require('../middleware/auth')


let expanses = []
router.get('/', auth, getExpanses)
router.patch('/', auth,  editExpanses)

module.exports = router