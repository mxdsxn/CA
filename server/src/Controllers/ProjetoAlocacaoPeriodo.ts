import express from 'express'
import { ProjetoAlocacaoPeriodoService as Service } from '@services'

const route = express.Router()

route.post('/ProjetoAlocacaoPeriodo/GetProjetoAlocacaoPeriodoByIdColabDia', (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const DiaCadastro = new Date(String(req.query.DiaCadastro))
  DiaCadastro.setHours(0, 0, 0)

  Service.GetProjetoAlocacaoPeriodoByIdColabDia(IdColab, DiaCadastro)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
