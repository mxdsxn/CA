/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'

const fechamentoSemanaByIdColaboradorMesAno = async (idColaborador: number, mes: number, ano: number) => {
  return dbConnection('pessoas.AtividadeFechamentoSemana')
    .where({
      Mes: mes,
      Ano: ano,
      IdColaborador: idColaborador
    })
}

export default {
    fechamentoSemanaByIdColaboradorMesAno
}