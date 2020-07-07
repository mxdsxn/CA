import express from 'express'
import {
  TesteController,
  AtividadeController,
  CalendarioController,
  ColaboradorController,
  ColaboradorContratoController,
  PontoController,
  ProjetoController,
  ProjetoAlocacaoPeriodoController,
  ProjetoCategoriaAtidadeController,
  ProjetoMetodologiaFaseController,
  RegistroAuxiliarController
} from '@controllers'

const routes = express.Router()

routes.use(
  TesteController,
  AtividadeController,
  CalendarioController,
  ColaboradorController,
  ColaboradorContratoController,
  PontoController,
  ProjetoController,
  ProjetoAlocacaoPeriodoController,
  ProjetoCategoriaAtidadeController,
  ProjetoMetodologiaFaseController,
  RegistroAuxiliarController
)

export default routes
