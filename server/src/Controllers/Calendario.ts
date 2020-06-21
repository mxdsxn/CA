import { Request, Response } from 'express'
import { CalendarioService as Service } from '@services/All'

export default class CalendarioController {
  async GetFeriadosByData(req: Request, res: Response) {
    const IdColab = Number(req.query.IdColab)
    const Data = new Date(String(req.query.Data))

    Service.GetFeriadosByData(IdColab, Data).then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
  }
}
