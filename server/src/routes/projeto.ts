import express from 'express'
import { ProjetoController as Controller } from '@controllers'

const route = express.Router()

route.get('/projeto/list', (req, res) => Controller.ProjetosByIdColaboradorDia(req, res))

route.get('/projeto/default/list', (req, res) => Controller.ProjetosDefault(req, res))

const ProjetoRoute = route
export default ProjetoRoute
