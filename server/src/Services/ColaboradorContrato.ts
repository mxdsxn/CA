
import connKnex from '@database/connection'
import { IColaboradorContrato } from '@models/All'

const PontoService = {
  GetContratosByDataId: async (IdColab: Number, Data: Date) => {
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

    const listaContrato: IColaboradorContrato[] = await connKnex
      .select('*')
      .from('pessoas.ColaboradorContrato')
      .where('IdColaborador', Number(IdColab))
      .andWhere(function () {
        this.where('Termino', '>=', mesReferenciaInicio).orWhere(
          'Termino',
          null
        )
      })
      .andWhere('DataInicioContrato', '<', mesReferenciaFim)

    return (listaContrato)
  }
}

export default PontoService
