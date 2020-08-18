import { ColaboradorService as Service } from '@services'
import libUtc from '@libUtc'

const CoordenadoresByDia = (req, res) => {
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.CoordenadoresByDia(diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

const HorasUteisMesByIdColaboradorMes = (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasUteisMesByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

const HorasUteisAteHojeByIdColaboradorMes = (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasUteisAteHojeByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

const HorasCadastradasByIdColaboradorMes = (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasCadastradasByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

const DadosBarraProgresso = (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.DadosBarraProgresso(idColaborador, mesReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

export default {
  CoordenadoresByDia,
  HorasUteisMesByIdColaboradorMes,
  HorasUteisAteHojeByIdColaboradorMes,
  HorasCadastradasByIdColaboradorMes,
  DadosBarraProgresso
}
