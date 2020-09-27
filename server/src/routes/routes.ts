import express from 'express'
import {
  EasterEggRoute,
  HealthCheckRoute,
  AtividadeRoute,
  AtividadeFechamentoRoute,
  AtividadeFechamentSemanaRoute,
  CalendarioRoute,
  ColaboradorRoute,
  ColaboradorContratoRoute,
  ProjetoRoute,
  ProjetoCategoriaAtidadeRoute,
  ProjetoMetodologiaFaseRoute
} from '@routes'

const routes = express.Router()

routes.use(
  EasterEggRoute,
  HealthCheckRoute,
  AtividadeRoute,
  AtividadeFechamentoRoute,
  AtividadeFechamentSemanaRoute,
  CalendarioRoute,
  ColaboradorRoute,
  ColaboradorContratoRoute,
  ProjetoRoute,
  ProjetoCategoriaAtidadeRoute,
  ProjetoMetodologiaFaseRoute
)

export default routes
