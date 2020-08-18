import express from 'express'
import { ColaboradorContratoController as Controller } from '@controllers'

const route = express.Router()

route.get('/ColaboradorContrato/ContratosByDataIdColaboradorMes', async (req, res) => Controller.ContratosByDataIdColaboradorMes(req, res))

route.get('/ColaboradorContrato/ContratoAtivoByIdColaboradorDia', async (req, res) => Controller.ContratoAtivoByIdColaboradorDia(req, res))

const ColaboradorContratoRoute = route
export default ColaboradorContratoRoute