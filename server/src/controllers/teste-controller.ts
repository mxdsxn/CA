import express from 'express'
import { TesteService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/teste/teste', (req, res) => {
  const Data = libUtc.getDateByString(req.query.Data as string)

  Service.Teste(Data)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
