import { ProjetoService as Service } from '@services'
import libUtc from '@libUtc'

const ProjetosByIdColaboradorDia = (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ProjetosByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

const ProjetosDefault = (req, res) => {
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ProjetosDefault(diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
}

export default {
  ProjetosByIdColaboradorDia,
  ProjetosDefault
}
