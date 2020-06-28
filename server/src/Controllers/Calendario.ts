import express from 'express'
import { CalendarioService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/Calendario/GetFeriadosDoData', async (req, res) => {
  const Data = timeUtc.utcString(req.query.Data)
  Data.setHours(0, 0, 0)

  Service.GetFeriadosDoData(Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.post('/Calendario/GetFeriadoByDia', async (req, res) => {
  const Dia = timeUtc.utcString(req.query.Dia)

  Service.GetFeriadoByDia(Dia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const CalendarioController = route
export default CalendarioController
