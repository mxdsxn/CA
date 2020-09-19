/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { AtividadeFechamentoEntity } from '@entities'

const atividadeFechamentoByIdColaboradorSemanaMesAno = async (idColaborador: number, semana: number, mes: number, ano: number): Promise<AtividadeFechamentoEntity> => {
  return await dbConnection('pessoas.AtividadeFechamento')
    .where({
      Semana: semana,
      Mes: mes,
      Ano: ano,
      IdColaborador: idColaborador
    })
    .select('*')
    .first()
}

const salvarAtividadeFechamento = async (atividadeFechamento: AtividadeFechamentoEntity): Promise<AtividadeFechamentoEntity> => {
  return await dbConnection('pessoas.AtividadeFechamento')
    .insert({
      IdColaborador: atividadeFechamento.IdColaborador,
      IdProjeto: atividadeFechamento.IdProjeto || null,
      IdColaboradorAprovador?: atividadeFechamento.IdColaboradorAprovador || null,
      IdAtividadeFechamentoStatus: atividadeFechamento.IdAtividadeFechamentoStatus,
      Ano: atividadeFechamento.Ano,
      Mes: atividadeFechamento.Mes,
      Semana: atividadeFechamento.Semana,
      DataFechamento: atividadeFechamento.DataFechamento.toISOString(),
      DataAprovacao: atividadeFechamento.DataAprovacao?.toISOString() || null
    })
}

export default {
  atividadeFechamentoByIdColaboradorSemanaMesAno,
  salvarAtividadeFechamento
}
