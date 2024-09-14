// 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用

const db = require('../db/index')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const { jwtSecretKey } = require('../config')

exports.register = (req, res) => {
    const userInfo = req.body
    // 检测用户名是否被占用
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, [userInfo.username], (err, results) => {
        if (err) {
            res.responseData(err.message)
            return
        }
        if (results.length > 0) {
            console.log(results);
            res.responseData('用户名被占用，请更换其他用户名!')
            return
        }

        // 对密码进行加密处理
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        // 生成 id
        const id = uuidv4()
        userInfo['id'] = id
        // 插入新用户
        const insertSql = 'insert into ev_users set ?'
        db.query(insertSql, userInfo, (err, result) => {
            if (err) return res.responseData(err.message)
            if (result.affectedRows !== 1) {
                res.responseData('注册用户失败，请稍后再试!')
                return
            }
            // 註冊成功
            res.responseData('註冊成功', 0)
        })
    })
}

exports.login = (req, res) => {
    const loginForm = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, [loginForm.username], (err, result) => {
        if (err) return res.responseData(err)
        if (result.length !== 1) return res.responseData('此用戶不存在')
        const { password: userPasswordFromDb } = result[0]
        const comparePassword = bcrypt.compareSync(loginForm.password, userPasswordFromDb)
        if (!comparePassword) return res.responseData('密碼錯誤')
        // 生成 token, 2個鐘頭過期
        const token = jwt.sign({ ...result[0], password: '', user_pic: '' }, jwtSecretKey, {
            expiresIn: '2h'
        })
        res.responseData('登陸成功', 0, { token: `Bearer ${token}` })
    })
}