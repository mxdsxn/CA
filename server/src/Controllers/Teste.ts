import express from 'express'
import { TesteService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/teste/teste', (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = timeUtc.utcString(req.query.Data)

  Service.Teste(IdColab, Data)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
  // res.json({ msg: 123 })
})

export default route
