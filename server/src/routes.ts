import express from 'express'
import {
  TesteController,
  AtividadeController,
  CalendarioController,
  ColaboradorContratoController,
  PontoController,
  RegistroAuxiliarController,
  ProjetoAlocacaoPeriodoController,
  ProjetoController
} from '@controllers'

const routes = express.Router()

routes.use(
  TesteController,
  AtividadeController,
  CalendarioController,
  RegistroAuxiliarController,
  PontoController,
  ColaboradorContratoController,
  ProjetoAlocacaoPeriodoController,
  ProjetoController
)

export default routes
