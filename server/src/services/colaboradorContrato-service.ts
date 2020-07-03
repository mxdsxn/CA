/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { IColaboradorContrato } from '@models'
import libUtc from '@libUtc'

const PontoService = {
  GetContratosByDataIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    const listaContrato: IColaboradorContrato[] = await connKnex('pessoas.ColaboradorContrato')
      .select('*')
      .where('IdColaborador', Number(idColaborador))
      .andWhere(function () {
        this.where('Termino', '>=', mesReferenciaInicio)
          .orWhere('Termino', null)
      })
      .andWhere('DataInicioContrato', '<=', mesReferenciaFim)
      .orderBy('DataInicioContrato', 'desc')

    return (listaContrato)
  },
  GetContratoAtivoByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDay(diaReferenciaInicio)
    const ContratoAtivo: IColaboradorContrato = await connKnex('pessoas.ColaboradorContrato')
      .select('*')
      .where('IdColaborador', idColaborador)
      .andWhere(function () {
        this.where('Termino', '>=', diaReferenciaInicio)
          .orWhere('Termino', null)
      })
      .andWhere('DataInicioContrato', '<=', diaReferenciaFim)
      .orderBy('DataInicioContrato', 'desc')
      .first()
    return ContratoAtivo
  }
}

export default PontoService
