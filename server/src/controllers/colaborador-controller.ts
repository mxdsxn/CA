import express from 'express'
import { ColaboradorService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.post('/Colaborador/GetCoordenadoresByDia', (req, res) => {
  const diaReferencia = libUtc.getDateByString(req.query.diaReferencia as string)

  Service.GetCoordenadoresByDia(diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
