const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      character: user.character,
      apiKey: user.apiKey,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    },
  )
  return token
}

const generateRefreshToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.REFRESH_SECRET,
    {
      expiresIn: '30d',
    },
  )
  return token
}

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// 리프레시 토큰 검증
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
}
