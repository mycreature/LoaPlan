const mariadb = require('mariadb')
const dotenv = require('dotenv')

dotenv.config()

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || '1234',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_db',
  connectionLimit: 5,
})

module.exports = pool
