const express = require('express')
const router = express.Router()
const { User } = require('../../models')

// 회원 정보 수정 엔드포인트
router.put('/', async (req, res) => {
  const { email } = req.params
  const { apiKey, character } = req.body

  try {
    // 1. 이메일로 기존 사용자 검색
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      return res.status(400).json({ message: '이메일을 찾을 수 없습니다.' })
    }

    // 2. apiKey와 character 정보 업데이트
    await User.update(
      { apiKey, character }, // 변경할 값
      { where: { email } }, // 조건
    )

    res.status(200).json({ message: '회원 정보가 수정되었습니다.' })
  } catch (error) {
    console.error('❌ 수정 실패:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
})

module.exports = router
