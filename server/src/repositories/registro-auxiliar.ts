/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { RegistroAuxiliarEntity } from '@entities'

const RegistroAuxiliarByIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date): Promise<RegistroAuxiliarEntity> => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  return await dbConnection('pessoas.RegistroAuxiliar')
    .where('Data', '>=', mesReferenciaInicio)
    .andWhere('Data', '<', mesReferenciaFim)
    .andWhere('IdColaborador', idColaborador)
    .select('*')
    .orderBy('IdRegistroAuxiliar', 'desc')
    .first()
}

export default {
  RegistroAuxiliarByIdColaboradorMes
}
