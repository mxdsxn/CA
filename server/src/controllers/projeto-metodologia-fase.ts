import { ProjetoMetodologiaFaseService as Service } from '@services'
import { Request, Response } from 'express'

const ProjetoFaseByIdProjeto = async (req: Request, res: Response) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.ProjetoFaseByIdProjeto(idProjeto)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default { ProjetoFaseByIdProjeto }
