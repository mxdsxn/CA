import express from 'express'
import { ProjetoMetodologiaFaseService as Service } from '@services'

const route = express.Router()

route.post('/ProjetoMetodologiaFase/GetProjetoFaseByIdProjeto', (req, res) => {
  const IdProjeto = Number(req.query.IdProjeto)

  Service.GetProjetoFaseByIdProjeto(IdProjeto)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
