import express from 'express'
import { ProjetoService as Service } from '@services'
import timeUtc from '@timeUtc'

const route = express.Router()

route.post('/Projeto/GetProjetoByIdColabDia', (req, res) => {
  const IdColab = Number(req.query.IdColab)
  const DiaCadastro = timeUtc.utcString(req.query.DiaCadastro as string)

  Service.GetProjetoByIdColabDia(IdColab, DiaCadastro)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
