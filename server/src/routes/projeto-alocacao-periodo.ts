import express from 'express'
import { ProjetoAlocacaoPeriodoController as Controller } from '@controllers'

const route = express.Router()

route.get('/ProjetoAlocacao/PeriodoProjetoAlocacaoPeriodoByIdColaboradorDia', (req, res) => Controller.ProjetoAlocacaoPeriodoByIdColaboradorDia(req, res))

const ProjetoAlocacaoPeriodoRoute = route
export default ProjetoAlocacaoPeriodoRoute
