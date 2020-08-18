import express from 'express'
import { RegistroAuxiliarController as Controller } from '@controllers'

const route = express.Router()

route.get('/RegistroAuxiliar/RegistroAuxiliarByIdColaboradorMes', async (req, res) => Controller.RegistroAuxiliarByIdColaboradorMes(req, res))

const RegistroAuxiliarRoute = route
export default RegistroAuxiliarRoute
