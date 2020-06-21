import { Request, Response } from 'express'
import { PontoService as Service } from '@services/All'

export default class PontoController {
  async GetPontoByDataId(req: Request, res: Response) {
    const IdColab = Number(req.query.IdColab)
    const Data = new Date(String(req.query.Data))

    Service.GetPontoByDataId(IdColab, Data).then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
  }
}
