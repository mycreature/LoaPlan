const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../../models')

// 회원가입 엔드포인트
router.post('/', async (req, res) => {
  const { email, password, apiKey, character } = req.body

  try {
    // 이미 존재하는 사용자 확인
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: '이미 등록된 이메일입니다.' })
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10)

    // 새로운 사용자 생성
    await User.create({ email, password: hashedPassword, apiKey, character })

    res.status(201).json({ message: '회원가입이 완료되었습니다.' })
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
})

module.exports = router
