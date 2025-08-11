const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { generateToken } = require('../utils/jwt')

// 로그인 엔드포인트
router.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    // 사용자 존재 여부 확인
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
    }

    const token = generateToken(user)

    // 로그인 성공
    res.status(200).json({
      message: '로그인 성공',
      token: token,
      user: {
        email: user.email,
        character: user.character,
        apiKey: user.apiKey,
      },
    })
  } catch (error) {
    console.error('로그인 오류:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
})

module.exports = router
