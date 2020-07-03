import express from 'express'
import { ColaboradorContratoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/ColaboradorContrato/GetContratosByDataId', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = timeUtc.utcString(req.query.mesReferencia as string)

  Service.GetContratosByDataId(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})
route.post('/ColaboradorContrato/GetContratoAtivoByIdColabDia', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = timeUtc.utcString(req.query.diaReferencia as string)

  Service.GetContratoAtivoByIdColabDia(idColaborador, diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const ColaboradorContratoControler = route
export default ColaboradorContratoControler
