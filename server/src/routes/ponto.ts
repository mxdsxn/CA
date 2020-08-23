import express from 'express'
import { PontoController as Controller } from '@controllers'

const route = express.Router()

route.get('/Ponto/PontoByIdColaboradorMes', async (req, res) => Controller.PontoByIdColaboradorMes(req, res))

route.get('/Ponto/PontoByIdColaboradorDia', async (req, res) => Controller.PontoByIdColaboradorDia(req, res))

const PontoRoute = route
export default PontoRoute
