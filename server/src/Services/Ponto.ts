/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { IPonto } from '@models'
import timeUtc from '@timeUtc'

const PontoService = {
  GetPontoByIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

    const listaPonto: IPonto[] = await connKnex('pessoas.Ponto')
      .select('*')
      .where('Data', '>=', mesReferenciaInicio)
      .andWhere('Data', '<', mesReferenciaFim)
      .andWhere({
        IdColaborador: idColaborador
      })
      .orderBy('Data', 'asc')

    return listaPonto
  },
  GetPontoByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const listaPonto: IPonto[] = await connKnex('pessoas.Ponto')
      .select('*')
      .where({
        Data: diaReferencia
      })
      .andWhere({
        IdColaborador: idColaborador
      })
      .orderBy('Data', 'asc')

    return listaPonto
  }
}

export default PontoService
