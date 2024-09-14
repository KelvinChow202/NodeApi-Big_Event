const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userinfo')
const Joi = require('joi')
const {jwtSecretKey} = require('./config')
const { expressjwt } = require('express-jwt');

const app = express()

// 自定義中間件，處理統一響應數據俾前端
app.use(function (req, res, next) {
    res.responseData = function (err, status = 1, data = null) {   // 0: 成功，1: 失敗
        res.send({
            status,
            // 判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
            data
        })
    }
    next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressjwt({ secret: jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }));

app.use('/api', userRouter)
// 以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userInfoRouter)

app.use(function (err, req, res, next) {
    // Joi 参数校验失败
    if (err instanceof Joi.ValidationError) {
        return res.send({
            status: 1,
            message: err.message
        })
    }
    if (err.name === 'UnauthorizedError') {
        return res.responseData(`身份认证失败: ${err.name}. ${err.message}`)
    }
    // 未知错误
    res.send({
        status: 1,
        message: err.message
    })
})

app.listen(3007, () => {
    console.log('Api server is running...');
})