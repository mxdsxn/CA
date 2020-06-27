import express from 'express'
import { CalendarioService as Service } from '@services'
import utcLib from '@utcLib'

const route = express.Router()

route.post('/Calendario/GetFeriadosDoData', async (req, res) => {
  const Data = new Date(String(req.query.Data))
  Data.setHours(0, 0, 0)

  Service.GetFeriadosDoData(Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.post('/Calendario/GetFeriadoByDia', async (req, res) => {
  const Dia = utcLib.utcDate(new Date(String(req.query.Dia)))

  Service.GetFeriadoByDia(Dia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const CalendarioController = route
export default CalendarioController
