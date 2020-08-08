import express from 'express'
import { ColaboradorContratoService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/ColaboradorContrato/GetContratosByDataIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.GetContratosByDataIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})
route.get('/ColaboradorContrato/GetContratoAtivoByIdColaboradorDia', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDateByString(req.query.diaReferencia as string)

  Service.GetContratoAtivoByIdColaboradorDia(idColaborador, diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const ColaboradorContratoControler = route
export default ColaboradorContratoControler
