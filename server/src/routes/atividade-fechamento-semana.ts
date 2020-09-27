/* eslint-disable no-unused-vars */
import express from 'express'
import { AtividadeFechamentoSemanaController as Controller } from '@controllers'

const route = express.Router()

route.get('/atividade-fechamento-semana/list', async (req, res) => await Controller.listaAtividadeFechamentoSemanaByIdColaboradorMesAno(req, res))

const AtividadeFechamentoSemanaRoute = route
export default AtividadeFechamentoSemanaRoute
