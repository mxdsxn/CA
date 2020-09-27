/* eslint-disable no-unused-vars */
import moment from 'moment'
import { AtividadeFechamentoService as Service } from '@services'
import { Request, Response } from 'express'

const fecharSemana = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaSemana = moment(req.query.diaSemana as string).utcOffset(0, true)

  try {
    const result = Service.fecharSemana(idColaborador, diaSemana)
    res.json(result)
    return res.status(200)
  } catch (error) {
    res.json(error)
    return res.status(500)
  }
}

export default {
  fecharSemana
}
