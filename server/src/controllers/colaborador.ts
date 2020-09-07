import { ColaboradorService as Service } from '@services'
import { Request, Response } from 'express'
import moment from 'moment'

const coordenadorByDia = async (req: Request, res: Response) => {
  const diaReferencia = moment(req.query.diaReferencia as string).utcOffset(0, true).startOf('day')

  try {
    const result = await Service.coordenadorByDia(diaReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default {
  coordenadorByDia
}
