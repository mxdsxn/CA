/* eslint-disable no-unused-vars */
import express from 'express'
import { AtividadeFechamentoController as Controller } from '@controllers'

const route = express.Router()

route.post('/atividade-fechamento', async (req, res) => await Controller.fecharSemana(req, res))

const AtividadeFechamentoRoute = route
export default AtividadeFechamentoRoute
