/* eslint-disable no-unused-vars */
import moment from 'moment'
import { AtividadeFechamentoSemanaService as Service } from '@services'
import { Request, Response } from 'express'

const listaAtividadeFechamentoSemanaByIdColaboradorMesAno = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = moment(req.query.mesReferencia as string).utcOffset(0, true)

  try {
    const result = await Service.listaAtividadeFechamentoSemanaByIdColaboradorMesAno(idColaborador, mesReferencia)
    res.json(result)
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

export default {
  listaAtividadeFechamentoSemanaByIdColaboradorMesAno
}
