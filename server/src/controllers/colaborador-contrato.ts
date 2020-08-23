import { ColaboradorContratoService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const ContratosByDataIdColaboradorMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.ContratosByDataIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { return res.json(suc) },
    (err) => { return res.json(err) }
  )
}

const ContratoAtivoByIdColaboradorDia = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ContratoAtivoByIdColaboradorDia(idColaborador, diaReferencia).then(
    (suc) => { return res.json(suc) },
    (err) => { return res.json(err) }
  )
}

export default {
  ContratosByDataIdColaboradorMes,
  ContratoAtivoByIdColaboradorDia
}
