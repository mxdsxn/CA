import express from 'express'
import { ColaboradorController as Controller } from '@controllers'

const route = express.Router()

route.get('/colaboraodor/coordenador/list/dia', (req, res) => Controller.CoordenadoresByDia(req, res))

route.get('/atividade/horas', (req, res) => Controller.DadosBarraProgresso(req, res))

const ColaboradorRoute = route
export default ColaboradorRoute
