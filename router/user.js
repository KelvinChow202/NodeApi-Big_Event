const express = require('express')
const userHandler = require('../router_handler/user')

const router = express.Router()

const {register, login} = userHandler

router.post('/register', register)

router.post('/login', login)

module.exports = router