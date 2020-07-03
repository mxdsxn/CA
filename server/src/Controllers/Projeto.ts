import express from 'express'
import { ProjetoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/Projeto/GetProjetosByIdColaboradorDia', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = timeUtc.utcString(req.query.diaReferencia as string)

  Service.GetProjetosByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
