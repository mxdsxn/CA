import { CalendarioService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'


const FeriadosByMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.FeriadosByMes(idColaborador, mesReferencia).then(
    (suc) => { return res.json(suc) },
    (err) => { return res.json(err) }
  )
}

const ListaFeriadoFinalSemanaByMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getDateByString(req.query.mesReferencia as string)

  Service.ListaFeriadoFinalSemanaByMes(idColaborador, mesReferencia).then(
    (suc) => { return res.json(suc) },
    (err) => { return res.json(err) }
  )
}

export default {
  FeriadosByMes,
  ListaFeriadoFinalSemanaByMes
}
