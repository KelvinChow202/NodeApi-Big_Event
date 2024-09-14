const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
    db.query(sql, [req.auth.id], (err, result) => {
        if (err) return res.responseData(err)
        if (result.length !== 1) return res.responseData('获取用户信息失败!')
        res.responseData('获取用户信息成功', 0, result)
    })
}

exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, result) => {
        if (err) return res.responseData(err)
        if (result.affectedRows !== 1) return res.responseData('更新用户信息失败!')
        res.responseData('更新用户信息成功', 0)
    })
}

exports.updateUserPassword = (req, res) => {
    const sql = 'select * from ev_users where id = ?'
    db.query(sql, [req.auth.id], (err, result) => {
        if (err) return res.responseData(err)
        if (result.length !== 1) return res.responseData('用戶不存在')
        const comparePwd = bcrypt.compareSync(req.body.oldPassword, result[0].password)
        if (!comparePwd) return res.responseData('舊密碼錯誤')
        const updateSql = 'update ev_users set password = ? where id = ?'
        const newPassword = bcrypt.hashSync(req.body.newPassword, 10)
        db.query(updateSql, [newPassword, req.auth.id], (err, result) => {
            if (err) return res.responseData(err)
            if (result.affectedRows !== 1) return res.responseData('修改密碼失败!')
            res.responseData('更新用户信息成功', 0)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic = ? where id = ?'
    db.query(sql, [req.body, req.auth.id], (err, result) => {
        if (err) return res.responseData(err)
        if (result.affectedRows !== 1) return res.responseData('更新頭像失败!')
        res.responseData('更新頭像成功', 0)
    })
}