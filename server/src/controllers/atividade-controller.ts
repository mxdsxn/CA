import express from 'express'
import { AtividadeService as Service } from '@services'
import libUtc from '@libUtc'
const route = express.Router()

route.get('/Atividade/GetAtividadesByIdColaboradorMes', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.GetAtividadesByIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.get('/Atividade/GetAtividadesByIdColaboradorDia', async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.GetAtividadesByIdColaboradorDia(idColaborador, diaReferencia).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
})

route.post('/Atividade/SalvarAtividade', async (req, res) => {
  const novaAtividade: any = req.query
  Service.SalvarAtividade(novaAtividade).then(
    (suc) => { res.json(suc) },
    (err) => { res.json(err) }
  )
  res.status(200)
})

const AtividadeController = route
export default AtividadeController
