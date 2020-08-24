/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { PontoEntity } from '@entities'

/* retorna todos os pontos do mes do colaborador */
const PontoByIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date): Promise<PontoEntity[]> => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  return await dbConnection('pessoas.Ponto')
    .select('*')
    .where('Data', '>=', mesReferenciaInicio)
    .andWhere('Data', '<=', mesReferenciaFim)
    .andWhere({
      IdColaborador: idColaborador
    })
    .orderBy('Data', 'asc')
}
/* retorna todos os pontos do colaborador no dia */
const PontoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date): Promise<PontoEntity[]> => {
  const diaReferenciaInicio = diaReferencia
  const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

  return await dbConnection('pessoas.Ponto')
    .select('*')
    .where('Data', '>=', diaReferenciaInicio)
    .andWhere('Data', '<=', diaReferenciaFim)
    .andWhere({
      IdColaborador: idColaborador
    })
    .orderBy('Data', 'asc')
}

export default {
  PontoByIdColaboradorMes,
  PontoByIdColaboradorDia
}
