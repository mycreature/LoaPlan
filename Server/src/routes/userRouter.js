const express = require('express')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const router = express.Router()

// 회원가입 라우터
router.post('/register', async (req, res) => {
  const { email, password, apiKey, character } = req.body

  if (!apiKey || !email || !password || !character) {
    return res.status(400).json({ message: '모든 항목을 입력해주세요.' })
  }

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ email, password: hashedPassword, apiKey, character })

    res.status(201).json({ message: '회원가입 성공' })
  } catch (err) {
    console.error('회원가입 중 서버 에러:', err)
    res.status(500).json({ message: '서버 오류', error: err })
  }
})

module.exports = router
