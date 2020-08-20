import express from 'express'
import {
  EasterEggRoute,
  HealthCheckRoute,
  AtividadeRoute,
  CalendarioRoute,
  ColaboradorRoute,
  ColaboradorContratoRoute,
  PontoRoute,
  ProjetoRoute,
  ProjetoAlocacaoPeriodoRoute,
  ProjetoCategoriaAtidadeRoute,
  ProjetoMetodologiaFaseRoute,
  RegistroAuxiliarRoute
} from '@routes'

const routes = express.Router()

routes.use(
  EasterEggRoute,
  HealthCheckRoute,
  AtividadeRoute,
  CalendarioRoute,
  ColaboradorRoute,
  ColaboradorContratoRoute,
  PontoRoute,
  ProjetoRoute,
  ProjetoAlocacaoPeriodoRoute,
  ProjetoCategoriaAtidadeRoute,
  ProjetoMetodologiaFaseRoute,
  RegistroAuxiliarRoute
)

export default routes
