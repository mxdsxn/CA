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

const salvarAtividadeFechamentoSemana = async (atividadeFechamentoSemana: AtividadeFechamentoSemanaEntity): Promise<AtividadeFechamentoSemanaEntity> => {
  return await dbConnection('pessoas.AtividadeFechamentoSemana')
    .insert({
      IdColaborador: atividadeFechamentoSemana.IdColaborador,
      IdAtividadeFechamentoStatus: atividadeFechamentoSemana.IdAtividadeFechamentoStatus,
      Ano: atividadeFechamentoSemana.Ano,
      Mes: atividadeFechamentoSemana.Mes,
      Semana: atividadeFechamentoSemana.Semana
    })
}

const atualizarAtividadeFechamentoSemana = async (atividadeFechamentoSemana: AtividadeFechamentoSemanaEntity): Promise<AtividadeFechamentoSemanaEntity> => {
  return await dbConnection('pessoas.AtividadeFechamentoSemana')
    .where('pessoas.AtividadeFechamentoSemana.IdAtividadeFechamentoSemana', atividadeFechamentoSemana.IdAtividadeFechamentoSemana)
    .andWhere('pessoas.AtividadeFechamentoSemana.IdColaborador', atividadeFechamentoSemana.IdColaborador)
    .andWhere('pessoas.AtividadeFechamentoSemana.Ano', atividadeFechamentoSemana.Ano)
    .andWhere('pessoas.AtividadeFechamentoSemana.Mes', atividadeFechamentoSemana.Mes)
    .andWhere('pessoas.AtividadeFechamentoSemana.Semana', atividadeFechamentoSemana.Semana)
    .update({
      IdAtividadeFechamentoStatus: atividadeFechamentoSemana.IdAtividadeFechamentoStatus
    })
}

export default {
  atividadeFechamentoSemanaByIdColaboradorSemanaMesAno,
  atualizarAtividadeFechamentoSemana,
  listaAtividadeFechamentoSemanaByIdColaboradorSemanaAno,
  listaAtividadeFechamentoSemanaByIdColaboradorMesAno,
  salvarAtividadeFechamentoSemana,
  statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno
}
