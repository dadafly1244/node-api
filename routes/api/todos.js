const fs = require('fs') // 내장 api (node js API : nodejs에서 가지고 있는 명령들/기능들 정도로 이해하면 좋음!! )
const { nanoid } = require('nanoid')
const express = require('express')

const router = express.Router()

const todosDir = `${global.appRoot}/todos`
const todosFile = `${global.appRoot}/todos/index.json`

//Read
router.get('/', (req, res) => {
  const todos =JSON.parse( fs.readFileSync(todosFile,'utf8'))
  res.status(200).json(todos)

})


//Create
router.post('/', (req, res) => {
  const { title }  = req.body

  let todos = {}
  try {
    todos = JSON.parse(fs.readFileSync(todosFile, {encoding:'utf8'})) //최상위 경로에서 todos폴더를 불러와라!!

  }catch(e) {
    fs.mkdirSync(todosDir)
    fs.writeFileSync(todosFile, '{}')//두번째 인수는 데이터!! 
  }

  todos[nanoid()] = { title }
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))// 두번째 세번째는 예쁘게 보이려고 하는거임!!

  res.status(200).json({title})
})

//Updateyyu7y77
router.put('/:id', (req, res) => {  
  const {id}  =  req.params
  const { title } = req.body
 const todos = JSON.parse( fs.readFileSync(todosFile, 'utf8'))
 todos[id].title = title

 fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))
 res.status(200).json(todos[id])
})

//Delete
router.delete('/:id', (req, res) => {  
  const {id}  =  req.params
  const todos = JSON.parse( fs.readFileSync(todosFile, 'utf8'))
  delete todos[id]
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))
  res.status(200).json(true)
})

module.exports = router