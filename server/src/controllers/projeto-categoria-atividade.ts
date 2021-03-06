import { ProjetoCategoriaAtividadeService as Service } from '@services'
import { Request, Response } from 'express'

const projetoCategoriaAtividadeByIdProjeto = async (req: Request, res: Response) => {
  const idProjeto = Number(req.query.idProjeto)

  try {
    const result = await Service.projetoCategoriaAtividadeByIdProjeto(idProjeto)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default { projetoCategoriaAtividadeByIdProjeto }
