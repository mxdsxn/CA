import { Request, Response } from 'express'
import { AtividadeService as Service } from '@services/All'

export default class AtividadeController {
  async GetAtividadesByDataColaboradores(req: Request, res: Response) {
    const IdColab = Number(req.query.IdColab)
    const Data = new Date(String(req.query.Data))

    Service.GetAtividadesByDataColaboradores(IdColab, Data).then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
  }
}
