const express = require('express')
const router = express.Router()
const { User } = require('../../models')
const { sendVerificationEmail } = require('../../utils/mail-service')

// 이메일 인증코드 발송 엔드포인트
router.post('/', async (req, res) => {
  const { email, type } = req.body

  if (!email) return res.status(400).json({ message: '이메일을 입력하세요.' })

  const existingUser = await User.findOne({ where: { email } })

  if (type === 'register' && existingUser) {
    return res.status(400).json({ message: '이미 등록된 이메일입니다.' })
  }

  if (type === 'password' && !existingUser) {
    return res.status(400).json({ message: '등록되지 않은 이메일입니다.' })
  }

  try {
    await sendVerificationEmail(email)
    return res.status(201).json({ message: '인증 코드가 이메일로 발송되었습니다.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: '이메일 발송 실패' })
  }
})

module.exports = router
