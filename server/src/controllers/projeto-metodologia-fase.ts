import { ProjetoMetodologiaFaseService as Service } from '@services'
import { Request, Response } from 'express'

const projetoFaseByIdProjeto = async (req: Request, res: Response) => {
  const idProjeto = Number(req.query.idProjeto)

  try {
    const result = await Service.projetoFaseByIdProjeto(idProjeto)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default { projetoFaseByIdProjeto }
