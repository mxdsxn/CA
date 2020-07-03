import express from 'express'
import { ColaboradorContratoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/ColaboradorContrato/GetContratosByDataIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = timeUtc.utcString(req.query.mesReferencia as string)

  Service.GetContratosByDataIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})
route.post('/ColaboradorContrato/GetContratoAtivoByIdColaboradorDia', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = timeUtc.utcString(req.query.diaReferencia as string)

  Service.GetContratoAtivoByIdColaboradorDia(idColaborador, diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const ColaboradorContratoControler = route
export default ColaboradorContratoControler
