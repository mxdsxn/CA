import express from 'express'
import { RegistroAuxiliarService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/RegistroAuxiliar/GetRegistroAuxiliarByData', async (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = timeUtc.utcString(req.query.Data as string)

  Service.GetRegistroAuxiliarByData(IdColab, Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const RegistroAuxiliarController = route
export default RegistroAuxiliarController
