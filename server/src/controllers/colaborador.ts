import { ColaboradorService as Service } from '@services'
import libUtc from '@libUtc'

const CoordenadoresByDia = async (req, res) => {
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.CoordenadoresByDia(diaReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

const HorasUteisMesByIdColaboradorMes = async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasUteisMesByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

const HorasUteisAteHojeByIdColaboradorMes = async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasUteisAteHojeByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

const HorasCadastradasByIdColaboradorMes = async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.HorasCadastradasByIdColaboradorMes(idColaborador, mesReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

const DadosBarraProgresso = async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.DadosBarraProgresso(idColaborador, mesReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default {
  CoordenadoresByDia,
  HorasUteisMesByIdColaboradorMes,
  HorasUteisAteHojeByIdColaboradorMes,
  HorasCadastradasByIdColaboradorMes,
  DadosBarraProgresso
}
