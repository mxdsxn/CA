import connKnex from '@database'
import { IPonto } from '@models'

const PontoService = {
  GetPontoByDataId: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim =
      mesReferenciaInicio.getMonth() < 11
        ? new Date(
          `${
          mesReferenciaInicio.getMonth() + 2
          }/1/${mesReferenciaInicio.getFullYear()}`
        )
        : mesReferenciaInicio.getMonth() === 11
          ? new Date(`1/1/${mesReferenciaInicio.getFullYear() + 1}`)
          : new Date()

    const listaPonto: IPonto[] = await connKnex('pessoas.Ponto')
      .select('*')
      .where('Data', '>=', mesReferenciaInicio)
      .andWhere('Data', '<', mesReferenciaFim)
      .andWhere('IdColaborador', Number(IdColab))

    return listaPonto
  }
}

export default PontoService
