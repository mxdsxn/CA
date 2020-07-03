import express from 'express'
import { PontoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/Ponto/GetPontoByIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = timeUtc.utcString(req.query.mesReferencia as string)

  Service.GetPontoByIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.post('/Ponto/GetPontoByIdColaboradorDia', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = timeUtc.utcString(req.query.diaReferencia as string)

  Service.GetPontoByIdColaboradorDia(idColaborador, diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const PontoController = route
export default PontoController
