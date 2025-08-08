const express = require('express')
const router = express.Router()

const { sendVerificationEmail, verificationCode } = require('../utils/mail-service')

// 이메일 인증코드 발송
router.post('/', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: '이메일이 필요합니다.' })

  try {
    await sendVerificationEmail(email)
    res.status(201).json({ message: '인증 코드가 이메일로 발송되었습니다.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: '이메일 발송 실패' })
  }
})

// 이메일 인증
router.post('/verify', (req, res) => {
  const { email, code } = req.body
  if (!email || !code) return res.status(400).json({ error: '이메일과 코드가 필요합니다.' })

  const savedCode = verificationCode[email]
  if (!savedCode) return res.status(404).json({ error: '인증 코드가 존재하지 않습니다.' })

  if (savedCode === code) {
    delete verificationCode[email]
    return res.json({ message: '이메일 인증이 완료되었습니다.' })
  } else {
    return res.status(400).json({ error: '인증 코드가 올바르지 않습니다.' })
  }
})

module.exports = router
