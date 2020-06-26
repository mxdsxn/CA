import express from 'express'
import { ProjetoService as Service } from '@services'

const route = express.Router()

route.post('/Projeto/GetProjetoByIdColabDia', (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const DiaCadastro = new Date(String(req.query.DiaCadastro))

  Service.GetProjetoByIdColabDia(IdColab, DiaCadastro)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
