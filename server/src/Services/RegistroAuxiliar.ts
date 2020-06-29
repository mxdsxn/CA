import connKnex from '@database'
import { IRegistroAuxiliar } from '@models'
import timeUtc from '@timeUtc'

const RegistroAuxiliarService = {
  GetRegistroAuxiliarByData: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

    const listaRA: IRegistroAuxiliar[] = await connKnex('pessoas.RegistroAuxiliar')
      .select('*')
      .where('Data', '>=', mesReferenciaInicio)
      .andWhere('Data', '<', mesReferenciaFim)
      .andWhere('IdColaborador', Number(IdColab))

    return (listaRA)
  }
}

export default RegistroAuxiliarService
