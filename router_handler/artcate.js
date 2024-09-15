const db = require('../db/index')
const { v4: uuidv4 } = require('uuid');

exports.getArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, result) => {
        if (err) return res.responseData(err)
        res.responseData('获取文章分类列表成功!', 0, result)
    })
}

exports.getArticleCatesById = (req, res) => {
    const sql = `select * from ev_article_cate where id = ?`
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.responseData(err)
        if (result.length !== 1) return res.responseData('此分類不存在')
        res.responseData('获取文章分类訊息成功!', 0, result)
    })
}

exports.addArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.responseData(err)
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.responseData('分类名称与别名被占用，请更换后重试!')
        if (result.length === 1 && result[0].name === req.body.name) return res.responseData(`分类名
称被占用，请更换后重试!`)
        if (result.length === 1 && result[0].alias === req.body.alias) return res.responseData(`分类别名
        被占用，请更换后重试!`)
        // 新增分類
        const sql = `insert into ev_article_cate set ?`
        const id = uuidv4()
        const cate = req.body
        cate['id'] = id
        db.query(sql, cate, (err, result) => {
            if (err) return res.responseData(err)
            if (result.affectedRows !== 1) return res.responseData('新增文章分类失败!')
            res.responseData('新增文章分类成功!', 0)
        })
    })
}

exports.updateCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where id = ? and (name  = ? or alias = ?)'
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, result) => {
        if (err) return res.responseData(err)
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.responseData('分类名称与别名被占用，请更换后重试!')
        if (result.length === 1 && result[0].name === req.body.name) return res.responseData(`分类名
        称被占用，请更换后重试!`)
        if (result.length === 1 && result[0].alias === req.body.alias) return res.responseData(`分类别名
        被占用，请更换后重试!`)
        // 更新分類
        const sql = `update ev_article_cate set ? where id = ?`
        db.query(sql, [req.body, req.body.id], (err, result) => {
            if (err) return res.responseData(err)
            if (result.affectedRows !== 1) return res.responseData('更新文章分类失败!')
            res.responseData('更新文章分类成功!', 0)
        })
    })
}

exports.deleteArticleCates = (req, res) => {
    const sql = `update ev_article_cate set is_delete = 1 where id = ?`
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.responseData(err)
        if (result.affectedRows !== 1) return res.responseData('删除文章分类失败!')
        res.responseData('删除文章分类成功!', 0)
    })
}