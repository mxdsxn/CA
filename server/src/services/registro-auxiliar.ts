/* eslint-disable no-unused-vars */
import dbConnection  from '@database'
import { IRegistroAuxiliar } from '@models'
import libUtc from '@libUtc'

/* retorna lista de registro auxiliar naquele mes */
const RegistroAuxiliarByIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date) => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  const listaRegistroAuxiliar = await dbConnection('pessoas.RegistroAuxiliar')
    .select('*')
    .where('Data', '>=', mesReferenciaInicio)
    .andWhere('Data', '<', mesReferenciaFim)
    .andWhere('IdColaborador', idColaborador)
    .then((listaRegistroAuxiliar: IRegistroAuxiliar[]) => (listaRegistroAuxiliar))

  return (listaRegistroAuxiliar)
}

export default {
  RegistroAuxiliarByIdColaboradorMes
}
