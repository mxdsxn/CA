import { Moment } from 'moment'
import { ColaboradorContratoRepository as Repo } from '@repositories'

/* retorna lista de contratos num mes para calculo de horas */
const contratosByIdColaborador = async (idColaborador: Number, mesReferencia: Moment) => {
  const listaContrato = await Repo.contratosByIdColaborador(idColaborador, mesReferencia)

  return listaContrato
}

/* retorna contrato ativo no dia para carga horaria diaria */
const contratoAtivoByIdColaborador = async (idColaborador: Number, diaReferencia: Moment) => {
  const contratoAtivo = await Repo.contratoAtivoByIdColaborador(idColaborador, diaReferencia)

  return contratoAtivo || null
}

export default {
  contratosByIdColaborador,
  contratoAtivoByIdColaborador
}
