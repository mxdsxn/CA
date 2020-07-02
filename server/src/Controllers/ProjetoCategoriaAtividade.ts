import express from 'express'
import { ProjetoCategoriaAtividadeService as Service } from '@services'

const route = express.Router()

route.post('/ProjetoCategoriaAtividade/GetCategoriaAtividadeByIdProjeto', async (req, res) => {
  const IdProjeto = Number(req.query.IdProjeto)

  Service.GetCategoriaAtividadeByIdProjeto(IdProjeto)
    .then(
      (suc) => { res.json(suc) },
      (err) => { res.json(err) }
    )
})

export default route
