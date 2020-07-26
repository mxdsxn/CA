/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import { IRegistroAuxiliar } from '@models'
import libUtc from '@libUtc'

const RegistroAuxiliarService = {
  /* retorna lista de registro auxiliar naquele mes */
  GetRegistroAuxiliarByIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    const listaRegistroAuxiliar = await dbConnection('pessoas.RegistroAuxiliar')
      .select('*')
      .where('Data', '>=', mesReferenciaInicio)
      .andWhere('Data', '<', mesReferenciaFim)
      .andWhere('IdColaborador', idColaborador)
      .then((listaRegistroAuxiliar: IRegistroAuxiliar[]) => (listaRegistroAuxiliar))

    return validationArray(listaRegistroAuxiliar)
  }
}

export default RegistroAuxiliarService
