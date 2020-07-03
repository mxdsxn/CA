import express from 'express'
import { PontoService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.post('/Ponto/GetPontoByIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.GetPontoByIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.post('/Ponto/GetPontoByIdColaboradorDia', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDateByString(req.query.diaReferencia as string)

  Service.GetPontoByIdColaboradorDia(idColaborador, diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const PontoController = route
export default PontoController
