import { CalendarioService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'


const FeriadosByMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  try {
    const result = await Service.FeriadosByMes(idColaborador, mesReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const ListaFeriadoFinalSemanaByMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  try {
    const result = await Service.ListaFeriadoFinalSemanaByMes(idColaborador, mesReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default {
  FeriadosByMes,
  ListaFeriadoFinalSemanaByMes
}
