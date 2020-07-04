/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IPonto } from '@models'
import libUtc from '@libUtc'

const PontoService = {
  GetPontoByIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    const listaPonto = await dbConnection('pessoas.Ponto')
      .select('*')
      .where('Data', '>=', mesReferenciaInicio)
      .andWhere('Data', '<=', mesReferenciaFim)
      .andWhere({
        IdColaborador: idColaborador
      })
      .orderBy('Data', 'asc')
      .then((listaPonto: IPonto[]) => listaPonto)

    return listaPonto
  },
  GetPontoByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDay(diaReferenciaInicio)

    const listaPonto = await dbConnection('pessoas.Ponto')
      .select('*')
      .where('Data', '>=', diaReferenciaInicio)
      .andWhere('Data', '<=', diaReferenciaFim)
      .andWhere({
        IdColaborador: idColaborador
      })
      .orderBy('Data', 'asc')
      .then((listaPonto: IPonto[]) => listaPonto)

    return listaPonto
  }
}

export default PontoService
