import express from 'express'
import { CalendarioService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.post('/Calendario/GetFeriadosByMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.GetFeriadosByMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const CalendarioController = route
export default CalendarioController
