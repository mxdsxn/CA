import { default as atividade } from './atividade-api'
import { default as calendario } from './calendario-api'
import { default as colaborador } from './colaborador-api'
import { default as colaboradorContrato } from './colaboradorContrato-api'
import { default as ponto } from './ponto-api'
import { default as projeto } from './projeto-api'
import { default as projetoAlocacao } from './projetoAlocacao-api'
import { default as projetoCategoriaAtividade } from './projetoCategoriaAtividade-api'
import { default as projetoMetodologiaFase } from './projetoMetodologiaFase-api'
import { default as registroAuxiliar } from './registroAuxiliar-api'

const apiConnecion = {
  atividade,
  calendario,
  colaborador,
  colaboradorContrato,
  ponto,
  projeto,
  projetoAlocacao,
  projetoCategoriaAtividade,
  projetoMetodologiaFase,
  registroAuxiliar
}

export default apiConnecion