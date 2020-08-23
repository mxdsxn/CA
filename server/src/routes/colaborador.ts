import express from 'express'
import { ColaboradorController as Controller } from '@controllers'

const route = express.Router()

route.get('/Colaborador/CoordenadoresByDia', (req, res) => Controller.CoordenadoresByDia(req, res))

route.get('/Colaborador/HorasUteisMesByIdColaboradorMes', (req, res) => Controller.HorasUteisMesByIdColaboradorMes(req, res))

route.get('/Colaborador/HorasUteisAteHojeByIdColaboradorMes', (req, res) => Controller.HorasUteisAteHojeByIdColaboradorMes(req, res))

route.get('/Colaborador/HorasCadastradasByIdColaboradorMes', (req, res) => Controller.HorasCadastradasByIdColaboradorMes(req, res))

route.get('/Colaborador/DadosBarraProgresso', (req, res) => Controller.DadosBarraProgresso(req, res))

const ColaboradorRoute = route
export default ColaboradorRoute
