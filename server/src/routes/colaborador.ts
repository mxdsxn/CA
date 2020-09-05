import express from 'express'
import { ColaboradorController as Controller } from '@controllers'

const route = express.Router()

route.get('/colaboraodor/coordenador/list/dia', async (req, res) => await Controller.CoordenadoresByDia(req, res))

const ColaboradorRoute = route
export default ColaboradorRoute
