import express, { Request, Response } from 'express'
import { query, validationResult } from 'express-validator'
import moment from 'moment'

import { AtividadeController as Controller } from '@controllers'

const route = express.Router()

route.get('/Atividade/AtividadesByIdColaboradorMes', async (req, res, next) => Controller.AtividadesByIdColaboradorMes(req, res, next))

route.get('/Atividade/AtividadesByIdColaboradorDia', async (req, res) => Controller.AtividadesByIdColaboradorDia(req, res))

route.post('/Atividade/SalvarAtividade', [
  query('idAtividade').isInt().optional(),
  query('diaAtividade', 'Dia da atividade é obrigatorio').custom((value: string) => moment.utc(value).isValid()),
  query('cargaAtividade', 'Carga da atividade é obrigatorio').custom((value: string) => moment.utc(value).isValid()),
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
    console.log({ errors: errors.array() })
    return res.status(400).json({ errors: errors.array() })
  }
  return Controller.SalvarAtividade(req, res)
})

const AtividadeRoute = route
export default AtividadeRoute
