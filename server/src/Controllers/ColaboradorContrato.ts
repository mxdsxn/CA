import { Request, Response } from 'express'
import { ColaboradorContratoService as Service } from '@services/All'

export default class ColaboradorContratoControler {
  async GetContratosByDataId(req: Request, res: Response) {
    const IdColab = Number(req.query.IdColab)
    const Data = new Date(String(req.query.Data))

    Service.GetContratosByDataId(IdColab, Data).then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
  }
}
