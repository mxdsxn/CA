import express from 'express'
import { AtividadeService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/Atividade/GetAtividadesByDataColaboradores', async (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = timeUtc.utcString(req.query.Data)

  Service.GetAtividadesByDataColaboradores(IdColab, Data).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const AtividadeController = route
export default AtividadeController
