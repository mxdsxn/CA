import express from 'express'
import { CalendarioController as Controller } from '@controllers'

const route = express.Router()

route.get('/calendario/list/mes', async (req, res) => Controller.FeriadosByMes(req, res))

route.get('/Calendario/ListaFeriadoFinalSemanaByMes', async (req, res) => Controller.ListaFeriadoFinalSemanaByMes(req, res))

const CalendarioRoute = route
export default CalendarioRoute
