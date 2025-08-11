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
      expiresIn: '1d',
    },
  )
  return token
}

module.exports = {
  generateToken,
}
