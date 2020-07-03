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
      .andWhere('IdColaborador', Number(idColaborador))

    return listaPonto
  }
}

export default PontoService
