const { Router } = require('express')
const router = Router()
const { User } = require('../models/user.model')
const { register, logIn, deleteUser, editUser, getUser } = require('../controllers/user.controllers')

let users = []
router.get('/', getUser)

router.post('/register', register)

router.post('/login', logIn)

router.delete('/:id', deleteUser)

router.patch('/:id', editUser)
module.exports = router