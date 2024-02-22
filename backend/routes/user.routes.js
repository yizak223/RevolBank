const { Router } = require('express')
const router = Router()
const { User } = require('../models/user.model')
const { auth } = require('../middleware/auth')
const { register, logIn, deleteUser, editUser, getUser, getToken } = require('../controllers/user.controllers')

let users = []
router.get('/', getUser)

router.post('/register', register)

router.post('/login', logIn)
router.post('/verify', getToken)

router.delete('/:id', deleteUser)

router.patch('/:id', auth, editUser)
module.exports = router