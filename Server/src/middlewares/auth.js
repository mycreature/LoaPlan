const { verifyAccessToken, verifyRefreshToken, generateToken } = require('../utils/jwt')
const { User } = require('../models')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization']

  const accessToken = authHeader && authHeader.split(' ')[1]
  const refreshToken = req.cookies.refreshToken

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: '인증 토큰이 없습니다.' })
  }

  // 1. 엑세스 토큰이 있는 경우
  if (accessToken) {
    const decoded = verifyAccessToken(accessToken)

    // 엑세스 토큰이 유효한 경우, 사용자 정보를 req.user에 저장하고 다음 미들웨어로 넘어갑니다.
    if (decoded) {
      req.user = decoded
      return next()
    }
  }

  // 2. 엑세스 토큰이 없거나 만료된 경우, 리프레시 토큰을 확인합니다.
  if (refreshToken) {
    const decodedRefresh = verifyRefreshToken(refreshToken)

    // 리프레시 토큰이 유효한 경우
    if (decodedRefresh) {
      try {
        const user = await User.findByPk(decodedRefresh.id)
        if (!user) {
          return res.status(403).json({ message: '유효하지 않은 사용자입니다.' })
        }

        // 새 엑세스 토큰 발급
        const newAccessToken = generateToken(user)
        res.setHeader('Authorization', `Bearer ${newAccessToken}`) // 새로운 엑세스 토큰을 헤더에 담아 전송
        req.user = { id: user.id, email: user.email } // req.user에 사용자 정보 저장

        return next()
      } catch (error) {
        console.error('새 엑세스 토큰 발급 오류:', error)
        return res.status(500).json({ message: '토큰 재발급 중 오류가 발생했습니다.' })
      }
    } else {
      // 리프레시 토큰이 유효하지 않은 경우
      return res
        .status(403)
        .json({ message: '리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.' })
    }
  }

  // 두 토큰 모두 없는 경우 (이미 위에서 처리되었지만, 안전을 위해)
  return res.status(401).json({ message: '인증 실패: 토큰이 유효하지 않습니다.' })
}

module.exports = authMiddleware
