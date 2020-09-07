import express, { Request, Response } from 'express'
import { query, validationResult } from 'express-validator'
import moment from 'moment'

import { AtividadeController as Controller } from '@controllers'

const route = express.Router()

route.get('/atividade/list/mes', async (req, res) => await Controller.atividadesByIdColaboradorMes(req, res))

route.get('/atividade/list/dia', async (req, res) => await Controller.atividadesByIdColaboradorDia(req, res))

route.post('/atividade', [
  query('idColaborador').isInt(),
  query('idAtividade').isInt().optional(),
  query('diaAtividade', 'Dia da atividade é obrigatorio').custom((value: string) => value === undefined ? false : moment.utc(value).isValid()),
  // query('cargaAtividade', 'Carga da atividade é obrigatorio').custom((value: string) => value === undefined ? false : moment.utc(value).isValid()),
  query('idProjeto', 'Projeto é obrigatorio').isInt(),
  query('idProjetoDefault', 'Projeto Default é obrigatorio').isInt(),
  query('idCoordenador', 'Coordenador é obrigatorio').isInt(),
  query('idProjetoFase', 'Fase Projeto é obrigatorio').isInt(),
  query('idCategoriaAtividade', 'Categoria Atividade é obrigatorio').isInt(),
  query('tagsAtividade').isArray().optional(),
  query('descricaoAtividade', 'Descricao é obrigatorio').isString()
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return await Controller.salvarAtividade(req, res)
})


route.get('/atividade/horas', async (req, res) => await Controller.horasMesByIdColaborador(req, res))

const AtividadeRoute = route
export default AtividadeRoute
