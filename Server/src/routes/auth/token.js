const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/auth')

router.post('/token', authMiddleware, (req, res) => {
  // res.setHeader로 새 액세스 토큰이 이미 헤더에 설정됨
  // 미들웨어 에서 다 처리하기에 얘 아무것도 하는거없음 미들웨어 사용을 위한 엔드포인트

  res.json({
    success: true,
    message: '토큰이 성공적으로 갱신되었습니다.',
    user: req.user,
  })
})

module.exports = router
