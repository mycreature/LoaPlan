const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const authMiddleware = require('./middlewares/auth')

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())

// 사용자 리소스 관리
const usersRouter = express.Router()
usersRouter.put('/:email', authMiddleware, require('./routes/users/update')) // 사용자 정보 수정
usersRouter.delete('/delete', authMiddleware, require('./routes/users/delete')) // 사용자 삭제
app.use('/api/users', usersRouter)

// 인증 관련
const authRouter = express.Router()
authRouter.post('/signup', require('./routes/auth/signup')) // 회원가입
authRouter.post('/login', require('./routes/auth/login')) // 로그인
// authRouter.post('/logout', require('./routes/auth/logout')) // 로그아웃
authRouter.put('/find-password', require('./routes/auth/find-password')) // 비밀번호 재설정
app.use('/api/auth', authRouter)

// 이메일 관련
const verificationRouter = express.Router()
verificationRouter.post('/', require('./routes/verification/send')) // 인증 코드 발송
verificationRouter.post('/verify', require('./routes/verification/verify')) // 인증 확인
app.use('/api/verification', verificationRouter)

// 정적 파일 서빙
const clientDistPath = path.join(__dirname, '../../Client/dist')
app.use(express.static(clientDistPath))

// SPA를 위한 라우팅 (API가 아닌 프론트엔드 라우팅)
app.get(/^\/(signup|login|info|find-password)?$/, (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// 서버 실행
const server = app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다`)
})
server.on('error', (err) => {
  console.error('❌ 서버 실행 중 오류 발생:', err.message)
})
