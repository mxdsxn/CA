import express from 'express'

import {
  AtividadeController, CalendarioController, RegistroAuxiliarController,
  PontoController,
  ColaboradorContratoController
} from '@controllers/All'
const atividadeController = new AtividadeController()
const calendarioController = new CalendarioController()
const registroAuxiliarController = new RegistroAuxiliarController()
const pontoController = new PontoController()
const contratoController = new ColaboradorContratoController()

const routes = express.Router()

routes.post(
  '/GetAtividadesByDataColaboradores',
  atividadeController.GetAtividadesByDataColaboradores
)

routes.post('/GetFeriadosByData', calendarioController.GetFeriadosByData)

routes.post(
  '/GetRegistroAuxiliarByData',
  registroAuxiliarController.GetRegistroAuxiliarByData
)

routes.post('/GetPontoByDataId', pontoController.GetPontoByDataId)

routes.post('/GetContratosByDataId', contratoController.GetContratosByDataId)

export default routes
