import express from 'express'
import { ProjetoAlocacaoPeriodoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/ProjetoAlocacaoPeriodo/GetProjetoAlocacaoPeriodoByIdColaboradorDia', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = timeUtc.utcString(req.query.diaReferencia as string)

  Service.GetProjetoAlocacaoPeriodoByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
