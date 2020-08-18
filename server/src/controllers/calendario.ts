import express from 'express'
import { CalendarioService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/Calendario/FeriadosByMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.FeriadosByMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.get('/Calendario/ListaFeriadoFinalSemanaByMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.ListaFeriadoFinalSemanaByMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const CalendarioController = route
export default CalendarioController
