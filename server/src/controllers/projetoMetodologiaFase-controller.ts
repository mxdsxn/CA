import express from 'express'
import { ProjetoMetodologiaFaseService as Service } from '@services'

const route = express.Router()

route.get('/ProjetoMetodologiaFase/GetProjetoFaseByIdProjeto', (req, res) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.GetProjetoFaseByIdProjeto(idProjeto)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
