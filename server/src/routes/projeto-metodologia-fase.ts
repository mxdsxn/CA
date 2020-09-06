import express from 'express'
import { ProjetoMetodologiaFaseController as Controller } from '@controllers'

const route = express.Router()

route.get('/projeto-metodologia-fase/list', async (req, res) => await Controller.projetoFaseByIdProjeto(req, res))

const ProjetoMetodologiaFaseRoute = route
export default ProjetoMetodologiaFaseRoute
