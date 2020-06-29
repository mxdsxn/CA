import express from 'express'
import { ProjetoAlocacaoPeriodoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/ProjetoAlocacaoPeriodo/GetProjetoAlocacaoPeriodoByIdColabDia', (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const DiaCadastro = timeUtc.utcString(req.query.DiaCadastro as string)

  Service.GetProjetoAlocacaoPeriodoByIdColabDia(IdColab, DiaCadastro)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
