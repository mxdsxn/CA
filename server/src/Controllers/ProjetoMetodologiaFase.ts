import express from 'express'
import { ProjetoMetodologiaFaseService as Service } from '@services'

const route = express.Router()

route.post('/ProjetoMetodologiaFase/GetFaseByIdProjeto', (req, res) => {
  const IdProjeto = Number(req.query.IdProjeto)

  Service.GetFaseByIdProjeto(IdProjeto)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
