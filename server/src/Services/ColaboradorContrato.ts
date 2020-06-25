import connKnex from '@database'
import { IColaboradorContrato } from '@models'

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

    const listaContrato: IColaboradorContrato[] = await connKnex('pessoas.ColaboradorContrato')
      .select('*')
      .where('IdColaborador', Number(IdColab))
      .andWhere(function () {
        this.where('Termino', '>=', mesReferenciaInicio).orWhere(
          'Termino',
          null
        )
      })
      .andWhere('DataInicioContrato', '<=', mesReferenciaFim)

    return (listaContrato)
  },
  GetContratoAtivoByIdColabDia: async (IdColab: Number, Dia: Date) => {
    const ContratoAtivo: IColaboradorContrato = await connKnex('pessoas.ColaboradorContrato')
      .select('*')
      .where('IdColaborador', IdColab)
      .andWhere(function () {
        this.where('Termino', '>=', Dia)
          .orWhere('Termino', null)
      })
      .andWhere('DataInicioContrato', '<=', Dia)
    return ContratoAtivo
  }
}

export default PontoService
