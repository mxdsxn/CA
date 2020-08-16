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
  const idAtividade = Number(req.query.idAtividade)
  const diaAtividade = req.query.diaAtiviade
  const cargaAtividade = libUtc.getDateByString(req.query.cargaAtividade as string)
  const idProjeto = Number(req.query.idProjeto)
  const idProjetoDefault = Number(req.query.idProjetoDefault)
  const idCoordenador = Number(req.query.idCoordenador)
  const idProjetoFase = Number(req.query.idProjetoFase)
  const idCategoriaAtividade = Number(req.query.idCategoriaAtividade)
  const tagsAtividade = req.query.tagsAtividade as [string]
  const descricaoAtividade = req.query.descricaoAtividade as string

  console.log(req.query)
  // Service.SalvarAtividade(
  //   idAtividade,
  //   diaAtividade,
  //   cargaAtividade,
  //   idProjeto,
  //   idProjetoDefault,
  //   idCoordenador,
  //   idProjetoFase,
  //   idCategoriaAtividade,
  //   tagsAtividade,
  //   descricaoAtividade
  // ).then(
  //   (suc) => { res.json(suc) },
  //   (err) => { res.json(err) }
  // )
  res.status(200)
})

const AtividadeController = route
export default AtividadeController
