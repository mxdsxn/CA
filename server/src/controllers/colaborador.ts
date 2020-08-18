import express from 'express'
import { ColaboradorService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/Colaborador/CoordenadoresByDia', (req, res) => {
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.CoordenadoresByDia(diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Colaborador/HorasUteisMesByIdColaboradorMes', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasUteisMesByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Colaborador/HorasUteisAteHojeByIdColaboradorMes', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasUteisAteHojeByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Colaborador/HorasCadastradasByIdColaboradorMes', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasCadastradasByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

route.get('/Colaborador/DadosBarraProgresso', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.DadosBarraProgresso(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
