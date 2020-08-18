import express from 'express'
import { ProjetoCategoriaAtividadeController as Controller } from '@controllers'

const route = express.Router()

route.get('/ProjetoCategoria/AtividadeProjetoCategoriaAtividadeByIdProjeto', async (req, res) => Controller.ProjetoCategoriaAtividadeByIdProjeto(req, res))

const ProjetoCategoriaAtividadeRoute = route
export default ProjetoCategoriaAtividadeRoute
