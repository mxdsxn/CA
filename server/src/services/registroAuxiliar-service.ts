/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IRegistroAuxiliar } from '@models'
import libUtc from '@libUtc'

const RegistroAuxiliarService = {
  GetRegistroAuxiliarByIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    const listaRA: IRegistroAuxiliar[] = await dbConnection('pessoas.RegistroAuxiliar')
      .select('*')
      .where('Data', '>=', mesReferenciaInicio)
      .andWhere('Data', '<', mesReferenciaFim)
      .andWhere('IdColaborador', idColaborador)

    return (listaRA)
  }
}

export default RegistroAuxiliarService
