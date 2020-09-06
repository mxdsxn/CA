import { ColaboradorContratoService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const contratosByIdColaborador = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

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
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

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
