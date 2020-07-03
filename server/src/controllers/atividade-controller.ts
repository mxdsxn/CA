import express from 'express'
import { AtividadeService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.post('/Atividade/GetAtividadesMesByIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.GetAtividadesMesByIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

const AtividadeController = route
export default AtividadeController
