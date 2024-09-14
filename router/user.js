const express = require('express')
const userHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const {userSchema} = require('../schema/user')

const router = express.Router()

const {register, login} = userHandler

// 使用 局部中間件，驗證 form
router.post('/register', expressJoi(userSchema) ,register)

router.post('/login', expressJoi(userSchema), login)

module.exports = router