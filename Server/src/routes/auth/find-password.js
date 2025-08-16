const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../../models')

// 비밀번호 찾기 엔드포인트
router.put('/', async (req, res) => {
  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    // 비밀번호 확인
    if (!password) {
      return res.status(400).json({ message: '비밀번호를 입력해주세요.' })
    }

    // 1. 이메일로 기존 사용자 검색
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      return res.status(400).json({ message: '이메일을 찾을 수 없습니다.' })
    }

    // 2. 비밀번호 정보 업데이트
    await User.update(
      { password: hashedPassword }, // 변경할 값
      { where: { email } }, // 조건
    )

    res.status(200).json({ message: '회원 정보가 수정되었습니다.' })
  } catch (error) {
    console.error('❌ 수정 실패:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
})

module.exports = router
