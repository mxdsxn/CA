import express from 'express'
import { RegistroAuxiliarService as Service } from '@services'

const route = express.Router()

route.post('/RegistroAuxiliar/GetRegistroAuxiliarByData', async (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = new Date(String(req.query.Data))
  Data.setHours(0, 0, 0)

  Service.GetRegistroAuxiliarByData(IdColab, Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const RegistroAuxiliarController = route
export default RegistroAuxiliarController
