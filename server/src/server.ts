import express from 'express'
import cors from 'cors'
import routes from './routes/routes'

const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

server.get('/api', (req, res) => {
  res.json({ message: 'bem vindo à api do cadastro de atividades dextra' })
})

export default server
