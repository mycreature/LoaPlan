const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// 사용자 관련 라우터
const usersRouter = express.Router()
usersRouter.use('/register', require('./routes/register'))
usersRouter.use('/login', require('./routes/login'))
usersRouter.use('/userinfo', require('./routes/userinfo'))
app.use('/api/users', usersRouter)

// 정적 파일
const clientDistPath = path.join(__dirname, '../../Client/dist')
app.use(express.static(clientDistPath))

// 프론트엔드 진입점
app.get(/^\/(register|login|userinfo)?$/, (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

// 서버 실행
const server = app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다`)
})
server.on('error', (err) => {
  console.error('❌ 서버 실행 중 오류 발생:', err.message)
})
