import { Request, Response } from 'express'
import { RegistroAuxiliarService as Service } from '@services/All'

export default class RegistroAuxiliarController {
  async GetRegistroAuxiliarByData(req: Request, res: Response) {
    const IdColab = Number(req.query.IdColab)
    const Data = new Date(String(req.query.Data))

    Service.GetRegistroAuxiliarByData(IdColab, Data).then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
  }
}
