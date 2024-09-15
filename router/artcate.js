const expres = require('express')
const expressJoi = require('@escook/express-joi')
const { getCateSchema, addCateSchema, deleteCateSchema, updateCateSchema } = require('../schema/artcate')

const router = expres.Router()

const { getArticleCates, getArticleCatesById, addArticleCates, updateCateById, deleteArticleCates } = require('../router_handler/artcate')


router.get('/cates', getArticleCates)
router.get('/cates/:id', expressJoi(getCateSchema), getArticleCatesById)
router.post('/addcates', expressJoi(addCateSchema), addArticleCates)
router.put('/updatecate', expressJoi(updateCateSchema), updateCateById)
router.delete('/deletecate/:id', expressJoi(deleteCateSchema), deleteArticleCates)

module.exports = router