/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { IColaboradorContrato } from '@models'
import timeUtc from '@timeUtc'

const PontoService = {
  GetContratosByDataId: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

    const listaContrato: IColaboradorContrato[] = await connKnex('pessoas.ColaboradorContrato')
      .select('*')
      .where('IdColaborador', Number(idColaborador))
      .andWhere(function () {
        this.where('Termino', '>=', mesReferenciaInicio).orWhere(
          'Termino',
          null
        )
      })
      .andWhere('DataInicioContrato', '<=', mesReferenciaFim)

    return (listaContrato)
  },
  GetContratoAtivoByIdColabDia: async (idColaborador: Number, diaReferencia: Date) => {
    const ContratoAtivo: IColaboradorContrato[] = await connKnex('pessoas.ColaboradorContrato')
      .select('*')
      .where('IdColaborador', idColaborador)
      .andWhere(function () {
        this.where('Termino', '>=', diaReferencia)
          .orWhere('Termino', null)
      })
      .andWhere('DataInicioContrato', '<=', diaReferencia)
    return ContratoAtivo
  }
}

export default PontoService
