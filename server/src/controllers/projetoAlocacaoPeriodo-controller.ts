import express from 'express'
import { ProjetoAlocacaoPeriodoService as Service } from '@services'
import libUtc from '@libUtc'

const route = express.Router()

route.get('/ProjetoAlocacao/PeriodoProjetoAlocacaoPeriodoByIdColaboradorDia', (req, res) => {
  const idColaborador = Number(req.query.idColaborador)
  const diaReferencia = libUtc.getDate(libUtc.getDateByString(req.query.diaReferencia as string))

  Service.ProjetoAlocacaoPeriodoByIdColaboradorDia(idColaborador, diaReferencia)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
