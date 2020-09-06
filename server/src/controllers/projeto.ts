import { ProjetoService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const projetosByIdColaboradorDia = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  try {
    const result = await Service.projetosByIdColaboradorDia(idColaborador, diaReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const projetosDefault = async (req: Request, res: Response) => {
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  try {
    const result = await Service.projetosDefault(diaReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default {
  projetosByIdColaboradorDia,
  projetosDefault
}
