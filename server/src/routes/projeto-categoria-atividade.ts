import express from 'express'
import { ProjetoCategoriaAtividadeController as Controller } from '@controllers'

const route = express.Router()

route.get('/ProjetoCategoriaAtividade/ProjetoCategoriaAtividadeByIdProjeto', async (req, res) => Controller.ProjetoCategoriaAtividadeByIdProjeto(req, res))

const ProjetoCategoriaAtividadeRoute = route
export default ProjetoCategoriaAtividadeRoute
