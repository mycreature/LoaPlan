const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const HOST = process.env.DEV_MODE === 'true' ? 'localhost' : '0.0.0.0'
const authMiddleware = require('./middlewares/auth')

// 1. DEV_MODE 환경 변수를 기반으로 현재 환경을 확인합니다.
const isDevMode = process.env.DEV_MODE === 'true'

// 2. 현재 환경에 맞는 origin 값을 설정합니다.
const allowedOrigin = isDevMode ? 'http://localhost:5173' : 'https://loaplan.com'

// 3. 동적으로 설정된 origin 값을 cors 미들웨어에 적용합니다.
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())

// 사용자 리소스 관리
const usersRouter = express.Router()
usersRouter.post('/', require('./routes/users/signup')) // 회원가입 (사용자 생성)
usersRouter.put('/', authMiddleware, require('./routes/users/update')) // 사용자 정보 수정
usersRouter.delete('/', authMiddleware, require('./routes/users/delete')) // 사용자 삭제
app.use('/api/users', usersRouter)

// 인증 세션 관리
const authRouter = express.Router()
authRouter.post('/sessions', require('./routes/auth/login')) // 로그인 (세션 생성)
authRouter.get('/sessions', authMiddleware, require('./routes/auth/token')) // 토큰 확인
// authRouter.delete('/sessions', require('./routes/auth/logout')) // 로그아웃 (세션 삭제)
app.use('/api/auth', authRouter)

// 비밀번호 재설정
const passwordResetRouter = express.Router()
passwordResetRouter.put('/', require('./routes/auth/find-password')) // 비밀번호 재설정 요청
app.use('/api/password-reset', passwordResetRouter)

// 이메일 인증
const verificationRouter = express.Router()
verificationRouter.post('/', require('./routes/verification/send')) // 인증 코드 생성
verificationRouter.post('/:email/:code', require('./routes/verification/verify')) // 인증 확인
app.use('/api/verifications', verificationRouter)

// // 게시판 관련
// const boardRouter = express.Router()
// boardRouter.get('/', authMiddleware, require('./routes/boards/getAll')) // 게시판 리스트
// boardRouter.get('/:id', authMiddleware, require('./routes/boards/getOne')) // 특정 게시판 조회
// boardRouter.post('/', authMiddleware, require('./routes/boards/create')) // 게시판 생성
// boardRouter.put('/:id', authMiddleware, require('./routes/boards/update')) // 게시판 수정
// boardRouter.delete('/:id', authMiddleware, require('./routes/boards/delete')) // 게시판 삭제
// app.use('/api/boards', boardRouter)

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
const server = app.listen(PORT, HOST, () => {
  console.log(`✅ 서버가 http://${HOST}:${PORT} 에서 실행 중입니다`)
})
server.on('error', (err) => {
  console.error('❌ 서버 실행 중 오류 발생:', err.message)
})
