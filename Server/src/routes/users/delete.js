const express = require('express')
const router = express.Router()
const { User } = require('../../models')

// 회원 삭제 엔드포인트
router.delete('/', async (req, res) => {
  const { email } = req.params

  try {
    const deleted = await User.destroy({ where: { email } })
    if (!deleted) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' })
    }

    res.status(200).json({ message: '회원 탈퇴가 완료되었습니다.' })
  } catch (error) {
    console.error('❌ 회원 삭제 실패:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
})

module.exports = router
