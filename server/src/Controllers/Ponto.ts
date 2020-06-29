import express from 'express'
import { PontoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/Ponto/GetPontoByDataId', async (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = timeUtc.utcString(req.query.Data as string)

  Service.GetPontoByDataId(IdColab, Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const PontoController = route
export default PontoController
