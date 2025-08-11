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

module.exports = {
  generateToken,
  generateRefreshToken,
}
