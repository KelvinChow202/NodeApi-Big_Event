// 定義用户信息验证规则

const Joi = require('joi')

/**
* string() 值必须是字符串
* alphanum() 值只能是包含 a-zA-Z0-9 的字符串 * min(length) 最小长度
* max(length) 最大长度
* required() 值是必填项，不能为 undefined
* pattern(正则表达式) 值必须符合正则表达式的规则 
*/

// 注册和登录表单的验证规则对象
exports.userSchema = {
    // 校验 req.body 中的数据
    body: {
        username: Joi.string().alphanum().min(1).max(12).required(),
        password: Joi.string()
            .pattern(/^[\S]{6,12}$/)
            .required(),
        repassword: Joi.ref('password')
    },
}

// 更新表單
exports.updateUserSchema = {
    body: {
        id: Joi.string().required(),
        nickname: Joi.string().required(),
        email: Joi.string().email().required()
    }
}

// 更新密碼
exports.updatePasswordSchema = {
    body: {
        oldPassword: Joi.string()
            .pattern(/^[\S]{6,12}$/)
            .required(),
        newPassword: Joi.not(Joi.ref('oldPassword')).concat(Joi.string()
            .pattern(/^[\S]{6,12}$/)
            .required())
    }
}

// 更新頭像
exports.updateAvatarSchema = {
    body:{
        avatar: Joi.string().dataUri().required()
    }
}