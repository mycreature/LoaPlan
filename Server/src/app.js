// 이거 express 모듈 호출 express 호출해야하지 서버 구현이 되겟지?
const express = require('express')

// cors 모듈 호출 cors는 다른 도메인에서 api 호출하는 설정값
// 클라이언트랑 서버랑 포트번호가 다를때 요청 차단 안하게 해주는거
const cors = require('cors')

// 이거 dotenv 모듈 호출. env 파일의 환경변수를 node.js 에서 읽어야지
// 그냥 처 읽으면 보안에 문제점이 있으니깐 쓰는거
const dotenv = require('dotenv')

// path 모듈 호출. client 에서 빌드한 dist 폴더를 읽어오기 위해
const path = require('path')

// .env 내용 읽어서 procesds.env에 저장
dotenv.config()

// express 앱을 만들기. 즉 서버 만들고 설정 하기위한
const app = express()

// .env 에 써잇는 포트번호 호출 없으면 5000번
const PORT = process.env.PORT || 5000

// cors 미들웨어 등록 서버랑 클라이언트 포트가 다르면 에러가남
// 그거 막아주는거임
app.use(cors())

// 클라이언트에서 서버로 보낼때 Json 형태가 있으면
// 그거 읽을수있게 가공하는 설정
app.use(express.json())

app.use(express.static(path.join(__dirname, '../../Client/dist')))

// 루트 주소에 접속했을 때 응답하는 간단한 API
// http://localhost:5000/ 으로 접속하면 아래 문구가 뜸
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Client/dist/index.html'))
})

// 실제로 서버를 실행하는 부분
// 위에서 정한 PORT에서 서버가 켜지고, 콘솔에 주소도 같이 출력됨
const server = app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다`)
})
server.on('error', (err) => {
  console.error('❌ 서버 실행 중 오류 발생:', err.message)
})
const userRouter = require('./routes/userRouter')
app.use('/api/users', userRouter)

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)
