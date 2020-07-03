import express from 'express'
import { AtividadeService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/Atividade/GetAtividadesMesByIdColabMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = timeUtc.utcString(req.query.mesReferencia as string)

  Service.GetAtividadesMesByIdColabMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const AtividadeController = route
export default AtividadeController
