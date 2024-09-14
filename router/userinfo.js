const express = require('express')
const userinfo_handler = require('../router_handler/userinfo')
const { updateUserSchema, updatePasswordSchema, updateAvatarSchema } = require('../schema/user')
const expressJoi = require('@escook/express-joi')

const router = express.Router()

const { getUserInfo, updateUserInfo, updateUserPassword, updateAvatar } = userinfo_handler

router.get('/userinfo', getUserInfo)
router.put('/updateinfo', expressJoi(updateUserSchema), updateUserInfo)
router.put('/updatepwd', expressJoi(updatePasswordSchema), updateUserPassword)
router.post('/update/avatar', expressJoi(updateAvatarSchema), updateAvatar)

module.exports = router