import { ProjetoCategoriaAtividadeService as Service } from '@services'
import { Request, Response } from 'express'

const ProjetoCategoriaAtividadeByIdProjeto = async (req: Request, res: Response) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.ProjetoCategoriaAtividadeByIdProjeto(idProjeto)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default { ProjetoCategoriaAtividadeByIdProjeto }
