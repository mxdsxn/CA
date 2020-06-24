import express from 'express'
import { ProjetoAlocacaoPeriodoService as Service } from '@services'

const route = express.Router()

route.post('/ProjetoAlocacaoPeriodo/GetProjetoAlocacaoPeriodoByIdColabDia', (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const Data = new Date(String(req.query.Data))

  Service.GetProjetoAlocacaoPeriodoByIdColabDia(IdColab, Data)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
