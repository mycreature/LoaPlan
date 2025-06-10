const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// API 라우터
const registerRouter = require('./routes/register.js')
app.use('/api/users/register', registerRouter)

const loginRouter = require('./routes/login.js')
app.use('/api/users/login', loginRouter)

// 메인 페이지(루트 경로)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Client/dist/index.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Client/dist/index.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Client/dist/index.html'))
})

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, '../../Client/dist')))

// 서버 실행
const server = app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다`)
})
server.on('error', (err) => {
  console.error('❌ 서버 실행 중 오류 발생:', err.message)
})
