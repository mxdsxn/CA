import express from 'express'
import { TesteService as Service } from '@services'

const route = express.Router()

route.post('/teste/teste', (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = new Date(String(req.query.Data))

  Service.Teste(IdColab, Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

export default route
