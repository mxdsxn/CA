import express from 'express'
import { ProjetoCategoriaAtividadeController as Controller } from '@controllers'

const route = express.Router()

route.get('/projeto-categoria-atividade/list', async (req, res) => Controller.ProjetoCategoriaAtividadeByIdProjeto(req, res))

const ProjetoCategoriaAtividadeRoute = route
export default ProjetoCategoriaAtividadeRoute
