const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  // 응답 처리 헬퍼 함수
  const handleAuthError = (message) => {
    console.log('🔴', message)

    // API 요청인지 확인
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: message,
      })
    }
    return true
  }

  if (!token) {
    return handleAuthError('토큰이 없습니다.')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('🟢 토큰 인증 성공, payload:', decoded)

    req.user = decoded
    next()
  } catch (error) {
    return handleAuthError(`유효하지 않은 토큰입니다.: ${error.message}`)
  }
}

module.exports = authenticateToken
