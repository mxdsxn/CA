/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { AtividadeFechamentoSemanaEntity } from '@entities'

const listaAtividadeFechamentoSemanaByIdColaboradorSemanaAno = async (idColaborador: number, semana: number, ano: number) => {
  return await dbConnection('pessoas.AtividadeFechamentoSemana')
    .where({
      IdColaborador: idColaborador,
      Semana: semana,
      Ano: ano
    })
    .select('*')
}

const listaAtividadeFechamentoSemanaByIdColaboradorMesAno = async (idColaborador: number, mes: number, ano: number): Promise<AtividadeFechamentoSemanaEntity[]> => {
  return await dbConnection('pessoas.AtividadeFechamentoSemana')
    .where({
      Mes: mes,
      Ano: ano,
      IdColaborador: idColaborador
    })
    .select('*')
}

const statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno = async (idColaborador: number, semana: number, mes: number, ano: number) => {
  return await dbConnection('pessoas.AtividadeFechamentoSemana')
    .where({
      Semana: semana,
      Mes: mes,
      Ano: ano,
      IdColaborador: idColaborador
    })
    .select('IdAtividadeFechamentoStatus')
    .first()
}

const atividadeFechamentoSemanaByIdColaboradorSemanaMesAno = async (idColaborador: number, semana: number, mes: number, ano: number): Promise<AtividadeFechamentoSemanaEntity> => {
  return await dbConnection('pessoas.AtividadeFechamentoSemana')
    .where({
      Semana: semana,
      Mes: mes,
      Ano: ano,
      IdColaborador: idColaborador
    })
    .select('*')
    .first()
}

export default {
  atividadeFechamentoSemanaByIdColaboradorSemanaMesAno,
  listaAtividadeFechamentoSemanaByIdColaboradorSemanaAno,
  listaAtividadeFechamentoSemanaByIdColaboradorMesAno,
  statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno
}
