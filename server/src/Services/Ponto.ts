import connKnex from '@database'
import { IPonto } from '@models'
import timeUtc from '@timeUtc'

const PontoService = {
  GetPontoByDataId: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

    const listaPonto: IPonto[] = await connKnex('pessoas.Ponto')
      .select('*')
      .where('Data', '>=', mesReferenciaInicio)
      .andWhere('Data', '<', mesReferenciaFim)
      .andWhere('IdColaborador', Number(IdColab))

    return listaPonto
  }
}

export default PontoService
