import { ColaboradorService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const coordenadorByDiaÏ = async (req: Request, res: Response) => {
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  try {
    const result = await Service.coordenadorByDiaÏ(diaReferencia)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}


export default {
  coordenadorByDiaÏ
}
