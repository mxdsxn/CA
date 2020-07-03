import express from 'express'
import { CalendarioService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/Calendario/GetFeriadosByMes', async (req, res) => {
  const mesReferencia = timeUtc.utcString(req.query.mesReferencia as string)

  Service.GetFeriadosByMes(mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.post('/Calendario/GetFeriadoByDia', async (req, res) => {
  const diaReferencia = timeUtc.utcString(req.query.diaReferencia as string)

  Service.GetFeriadoByDia(diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const CalendarioController = route
export default CalendarioController
