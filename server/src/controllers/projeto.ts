import { ProjetoService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const ProjetosByIdColaboradorDia = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ProjetosByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

const ProjetosDefault = async (req: Request, res: Response) => {
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ProjetosDefault(diaReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default {
  ProjetosByIdColaboradorDia,
  ProjetosDefault
}
