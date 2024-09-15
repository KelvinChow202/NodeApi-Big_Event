const Joi = require('joi')

const name = Joi.string().required()
const alias = Joi.string().alphanum().required()
const id = Joi.string().required()

exports.getCateSchema = {
    params: {
        id
    }
}

exports.addCateSchema = {
    body: {
        name,
        alias
    }
}

exports.updateCateSchema = {
    body: {
        id,
        name,
        alias
    }
}

exports.deleteCateSchema = {
    params: {
        id
    }
}