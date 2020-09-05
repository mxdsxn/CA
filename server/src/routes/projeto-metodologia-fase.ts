import express from 'express'
import { ProjetoMetodologiaFaseController as Controller } from '@controllers'

const route = express.Router()

route.get('/projeto-metodologia-fase/list', (req, res) => Controller.ProjetoFaseByIdProjeto(req, res))

const ProjetoMetodologiaFaseRoute = route
export default ProjetoMetodologiaFaseRoute
