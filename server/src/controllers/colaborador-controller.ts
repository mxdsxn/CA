import express from 'express'
import { ColaboradorService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.post('/Colaborador/GetCoordenadoresByIdColaboradorDia', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDateByString(req.query.diaReferencia as string)

  Service.GetCoordenadoresByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
