import { ProjetoService as Service } from '@services'
import libUtc from '@libUtc'

const ProjetosByIdColaboradorDia = async (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ProjetosByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

const ProjetosDefault = async (req, res) => {
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
