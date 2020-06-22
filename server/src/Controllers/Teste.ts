import express from 'express'

const route = express.Router()

route.post('/teste/teste', (req, res) => {
  console.log('teste')
  res.json({ msg: 'teste' })
})

export default route
