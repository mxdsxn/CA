import express from 'express'
import { ProjetoMetodologiaFaseService as Service } from '@services'

const route = express.Router()

route.get('/ProjetoMetodologiaFase/ProjetoFaseByIdProjeto', (req, res) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.ProjetoFaseByIdProjeto(idProjeto)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
