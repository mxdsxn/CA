import connKnex from '@database'
import { IRegistroAuxiliar } from '@models'

const RegistroAuxiliarService = {
  GetRegistroAuxiliarByData: async (IdColab: Number, Data: Date) => {
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

    const listaRA: IRegistroAuxiliar[] = await connKnex('pessoas.RegistroAuxiliar')
      .select('*')
      .where('Data', '>=', mesReferenciaInicio)
      .andWhere('Data', '<', mesReferenciaFim)
      .andWhere('IdColaborador', Number(IdColab))

    return (listaRA)
  }
}

export default RegistroAuxiliarService
