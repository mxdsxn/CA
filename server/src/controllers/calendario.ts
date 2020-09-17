/* eslint-disable no-unused-vars */
import { CalendarioService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'
import moment from 'moment'

const feriadosByIdColaboradorMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = moment(req.query.mesReferencia as string).utcOffset(0, true).startOf('month')

  try {
    const result = await Service.feriadosByIdColaboradorMes(idColaborador, mesReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const ListaFeriadoFinalSemanaByMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = moment(req.query.mesReferencia as string).utcOffset(0, true).startOf('month')

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
  feriadosByIdColaboradorMes,
  ListaFeriadoFinalSemanaByMes
}
