import express from 'express'
import { ProjetoController as Controller } from '@controllers'

const route = express.Router()

route.get('/projeto/list', async (req, res) => await Controller.ProjetosByIdColaboradorDia(req, res))

route.get('/projeto/default/list', async (req, res) => await Controller.ProjetosDefault(req, res))

const ProjetoRoute = route
export default ProjetoRoute
