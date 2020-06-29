import connKnex from '@database'
import { IColaboradorContrato } from '@models'
import timeUtc from '@timeUtc'

const PontoService = {
  GetContratosByDataId: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

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
