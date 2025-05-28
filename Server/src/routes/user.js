const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res) => {
  try {
    const conn = await db.getConnection()
    const result = await conn.query('SELECT * FROM users')
    conn.release()
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'DB 오류' })
  }
})

module.exports = router
