import express from 'express'
import { CalendarioService as Service } from '@services'

const route = express.Router()

route.post('/Calendario/GetFeriadosByData', async (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = new Date(String(req.query.Data))

  Service.GetFeriadosByData(IdColab, Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const CalendarioController = route
export default CalendarioController
