import express from 'express'
import { AtividadeService as Service } from '@services'
import libUtc from '@libUtc'
const route = express.Router()

route.post('/Atividade/GetAtividadesByIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.GetAtividadesByIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.post('/Atividade/GetAtividadesByIdColaboradorDia', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.GetAtividadesByIdColaboradorDia(idColaborador, diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.post('/Atividade/CriarAtividade', async (req, res) => {
  const novaAtividade: any = req.query
  Service.CriarAtividade(novaAtividade).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
  res.json(200)
})

const AtividadeController = route
export default AtividadeController
