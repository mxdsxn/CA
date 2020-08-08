import express from 'express'
import { ProjetoCategoriaAtividadeService as Service } from '@services'

const route = express.Router()

route.get('/ProjetoCategoriaAtividade/GetProjetoCategoriaAtividadeByIdProjeto', async (req, res) => {
  const idProjeto = Number(req.query.idProjeto)

  Service.GetProjetoCategoriaAtividadeByIdProjeto(idProjeto)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
