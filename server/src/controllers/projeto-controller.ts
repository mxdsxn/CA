import express from 'express'
import { ProjetoService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/Projeto/GetProjetosByIdColaboradorDia', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDateByString(req.query.diaReferencia as string)

  Service.GetProjetosByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Projeto/GetProjetosDefault', (req, res) => {
  const diaReferencia = libUtc.getDateByString(req.query.diaReferencia as string)

  Service.GetProjetosDefault(diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
