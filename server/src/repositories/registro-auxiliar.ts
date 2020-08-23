import dbConnection from '@database'
import libUtc from '@libUtc'

const RegistroAuxiliarByIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date) => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  return await dbConnection('pessoas.RegistroAuxiliar')
    .where('Data', '>=', mesReferenciaInicio)
    .andWhere('Data', '<', mesReferenciaFim)
    .andWhere('IdColaborador', idColaborador)
    .select('*')
}

export default {
  RegistroAuxiliarByIdColaboradorMes
}
