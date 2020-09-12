/* eslint-disable no-unused-vars */
import { AtividadeFechamentoSemanaRepository as Repo } from '@repositories'
import { Moment } from 'moment'

const listaAtividadeFechamentoSemanaByIdColaboradorMesAno = async (idColaborador: number, mesReferencia: Moment) => {
  const result = await Repo.listaAtividadeFechamentoSemanaByIdColaboradorMesAno(idColaborador, mesReferencia.month() + 1, mesReferencia.year())
  return result
}

export default {
  listaAtividadeFechamentoSemanaByIdColaboradorMesAno
}
