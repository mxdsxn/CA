import express from 'express'

import AtividadeController from '@controllers/Atividade'
import CalendarioController from '@controllers/Calendario'
import RegistroAuxiliarController from '@controllers/RegistroAuxiliar'
import PontoController from '@controllers/Ponto'
import ContratoController from '@controllers/ColaboradorContrato'
const atividadeController = new AtividadeController()
const calendarioController = new CalendarioController()
const registroAuxiliarController = new RegistroAuxiliarController()
const pontoController = new PontoController()
const contratoController = new ContratoController()

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
