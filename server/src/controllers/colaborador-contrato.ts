import moment from 'moment'

import { ColaboradorContratoService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const contratosByIdColaborador = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = moment(req.query.mesReferencia as string).utcOffset(0, true).startOf('month')

  try {
    const result = await Service.contratosByIdColaborador(idColaborador, mesReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const contratoAtivoByIdColaborador = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = moment(req.query.diaReferencia as string).utcOffset(0, true).startOf('day')

  try {
    const result = await Service.contratoAtivoByIdColaborador(idColaborador, diaReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default {
  contratosByIdColaborador,
  contratoAtivoByIdColaborador
}
