import express from 'express'
import { AtividadeController as Controller } from '@controllers'

const route = express.Router()

route.get('/Atividade/AtividadesByIdColaboradorMes', async (req, res, next) => Controller.AtividadesByIdColaboradorMes(req, res, next))

route.get('/Atividade/AtividadesByIdColaboradorDia', async (req, res) => Controller.AtividadesByIdColaboradorDia(req, res))

route.post('/Atividade/SalvarAtividade', async (req, res) => Controller.SalvarAtividade(req, res))

const AtividadeRoute = route
export default AtividadeRoute
