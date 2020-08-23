import { RegistroAuxiliarService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const RegistroAuxiliarByIdColaboradorMes = async (req: Request, res: Response) => {
  const idColaborador = Number(req.query.idColaborador)
  const mesReferencia = libUtc.getMonth(libUtc.getDateByString(req.query.mesReferencia as string))

  Service.RegistroAuxiliarByIdColaboradorMes(idColaborador, mesReferencia).then(
    (suc) => { return res.json(suc) },
    (err) => { return res.json(err) }
  )
}

export default { RegistroAuxiliarByIdColaboradorMes }
