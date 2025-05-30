const express = require('express')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const router = express.Router()

// 회원가입 라우터
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: '모든 항목을 입력해주세요.' })
  }

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ username, email, password: hashedPassword })

    res.status(201).json({ message: '회원가입 성공' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '서버 오류' })
  }
})

module.exports = router
