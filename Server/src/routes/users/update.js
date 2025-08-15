const express = require('express')
const router = express.Router()
const { User } = require('../../models')
const authMiddleware = require('../../middlewares/auth')
const { generateToken, generateRefreshToken } = require('../../utils/jwt')

// 회원 정보 수정 엔드포인트
router.put('/update', authMiddleware, async (req, res) => {
  const { email } = req.user
  const { apiKey, character } = req.body

  try {
    // email 값으로 기존 사용자 검색
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      return res.status(400).json({ message: '이메일을 찾을 수 없습니다.' })
    }

    // apikey 및 character 정보 업데이트
    await User.update({ apiKey, character }, { where: { email } })

    // 업데이트된 user 정보 기준 token 다시 생성
    const updatedUser = await User.findOne({ where: { email } })
    const accessToken = generateToken(updatedUser)
    const refreshToken = generateRefreshToken(updatedUser)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    res.setHeader('Authorization', `Bearer ${accessToken}`)

    res.status(200).json({
      message: '회원 정보가 수정되었습니다.',
      token: accessToken,
      user: {
        email: updatedUser.email,
        character: updatedUser.character,
        apiKey: updatedUser.apiKey,
      },
    })
  } catch (error) {
    console.error('❌ 수정 실패:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
})

module.exports = router
