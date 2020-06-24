import express from 'express'
import {
  TesteController,
  AtividadeController,
  CalendarioController,
  ColaboradorContratoController,
  PontoController,
  RegistroAuxiliarController,
  ProjetoAlocacaoPeriodoController
} from '@controllers'

const routes = express.Router()

routes.use(
  TesteController,
  AtividadeController,
  CalendarioController,
  RegistroAuxiliarController,
  PontoController,
  ColaboradorContratoController,
  ProjetoAlocacaoPeriodoController
)

export default routes
