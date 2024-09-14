const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'big_event'
})

module.exports = db