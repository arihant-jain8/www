const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'security',
  user: 'root',
  password: '7859',
  // multipleStatements: true 
  // above value is by deafault false it prevents executing multiple queries simultaneously
  // this can also prevent xss consisiting of multiple queries
})

module.exports = pool;