import express from 'express'
import { ColaboradorService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/Colaborador/GetCoordenadoresByDia', (req, res) => {
  const diaReferencia = libUtc.getDateByString(req.query.diaReferencia as string)

  Service.GetCoordenadoresByDia(diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Colaborador/GetHorasUteisMesByIdColaboradorMes', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.GetHorasUteisMesByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Colaborador/GetHorasUteisAteHojeByIdColaboradorMes', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.GetHorasUteisAteHojeByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Colaborador/GetHorasCadastradasByIdColaboradorMes', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.GetHorasCadastradasByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Colaborador/GetDadosBarraProgresso', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.GetDadosBarraProgresso(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
