const express = require('express')
const { signup, login, listUsers, findOneUser, destroy } = require("./user.controller")

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', login)
router.get('/users', listUsers)
router.get('/:userId', findOneUser)
router.delete('/:userId', destroy)

module.exports = router