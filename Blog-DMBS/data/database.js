const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'blog', //schema/db name in our database
    user: 'root',
    password: '7859'
});

module.exports = pool;