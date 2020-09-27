import express from 'express'
import { ColaboradorContratoController as Controller } from '@controllers'

const route = express.Router()

route.get('/colaborador-contrato/list', async (req, res) => await Controller.contratosByIdColaborador(req, res))

route.get('/colaborador-contrato/', async (req, res) => await Controller.contratoAtivoByIdColaborador(req, res))

const ColaboradorContratoRoute = route
export default ColaboradorContratoRoute
