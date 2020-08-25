import { RegistroAuxiliarService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const RegistroAuxiliarByIdColaboradorMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  try {
    const result = await Service.RegistroAuxiliarByIdColaboradorMes(idColaborador, mesReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default { RegistroAuxiliarByIdColaboradorMes }
