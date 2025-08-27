const express = require('express')
const router = express.Router()

const { verificationCode } = require('../../utils/mail-service')

// 이메일 인증코드 확인 엔드포인트
router.post('/:email/:code', async (req, res) => {
  const { email, code } = req.params
  if (!email || !code) return res.status(400).json({ message: '이메일과 코드가 필요합니다.' })

  const savedCode = verificationCode[email]
  if (!savedCode) return res.status(404).json({ message: '인증 코드가 존재하지 않습니다.' })

  if (savedCode === code) {
    delete verificationCode[email]
    return res.json({ message: '이메일 인증이 완료되었습니다.' })
  } else {
    return res.status(400).json({ message: '인증 코드가 올바르지 않습니다.' })
  }
})

module.exports = router
