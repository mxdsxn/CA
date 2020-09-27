import express from 'express'
import { ProjetoController as Controller } from '@controllers'

const route = express.Router()

route.get('/projeto/list', async (req, res) => await Controller.projetosByIdColaboradorDia(req, res))

route.get('/projeto/default/list', async (req, res) => await Controller.projetosDefault(req, res))

const ProjetoRoute = route
export default ProjetoRoute
