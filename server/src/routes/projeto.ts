import express from 'express'
import { ProjetoController as Controller } from '@controllers'

const route = express.Router()

route.get('/Projeto/ProjetosByIdColaboradorDia', (req, res) => Controller.ProjetosByIdColaboradorDia(req, res))

route.get('/Projeto/ProjetosDefault', (req, res) => Controller.ProjetosDefault(req, res))

const ProjetoRoute = route
export default ProjetoRoute
