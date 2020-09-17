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

export default { atividadeFechamentoByIdColaboradorSemanaMesAno }
