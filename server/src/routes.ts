import express from 'express'
import {
  TesteController,
  AtividadeController,
  CalendarioController,
  ColaboradorContratoController,
  PontoController,
  RegistroAuxiliarController
} from '@controllers'

const routes = express.Router()

routes.use(
  TesteController,
  AtividadeController,
  CalendarioController,
  RegistroAuxiliarController,
  PontoController,
  ColaboradorContratoController
)

export default routes
