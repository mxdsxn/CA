import express from 'express'
import { ColaboradorContratoService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/ColaboradorContrato/ContratosByDataIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.ContratosByDataIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})
route.get('/ColaboradorContrato/ContratoAtivoByIdColaboradorDia', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ContratoAtivoByIdColaboradorDia(idColaborador, diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const ColaboradorContratoControler = route
export default ColaboradorContratoControler
