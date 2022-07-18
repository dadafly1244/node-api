const express = require('express')
const cors = require('cors')

global.appRoot = __dirname

const app = express()
app.use(express.json())
// app.use(cors({ // 화이트 리스트!! 내가 적은 곳만 허용할 것이다!!
//   origin: ['http://naver.com']
// }))

app.use(cors())
//http://localhost:1234/api/todos
app.use('/api/todos', require('./routes/api/todos.js') )

const port = process.env.PORT || 1234 //다른 환경에서도 이렇게 환경변수설정해주면 돌아감!! 로컬에서는 1234 
app.listen(port,()=> {
  console.log('서버 동작합니다!!')
})