/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { ColaboradorContratoEntity } from '@entities'
import moment, { Moment } from 'moment'

const contratosByIdColaborador = async (idColaborador: Number, mesReferencia: Moment): Promise<ColaboradorContratoEntity[]> => {
  const mesReferenciaInicio = moment(mesReferencia).utcOffset(0, true).startOf('month')
  const mesReferenciaFim = moment(mesReferencia).utcOffset(0, true).endOf('month')

  return await dbConnection('pessoas.ColaboradorContrato')
    .where('IdColaborador', Number(idColaborador))
    .andWhere(function () {
      this.where('Termino', '>=', mesReferenciaInicio.toISOString())
        .orWhere('Termino', null)
    })
    .andWhere('DataInicioContrato', '<=', mesReferenciaFim.toISOString())
    .select('*')
    .orderBy('DataInicioContrato', 'asc')
}

const contratoAtivoByIdColaborador = async (idColaborador: Number, diaReferencia: Moment): Promise<ColaboradorContratoEntity> => {
  const diaReferenciaInicio = moment(diaReferencia).utcOffset(0, true).startOf('day')
  const diaReferenciaFim = moment(diaReferencia).utcOffset(0, true).endOf('day')

  return await dbConnection('pessoas.ColaboradorContrato')
    .where('IdColaborador', idColaborador)
    .andWhere(function () {
      this.where('Termino', '>=', diaReferenciaInicio.toISOString())
        .orWhere('Termino', null)
    })
    .andWhere('DataInicioContrato', '<=', diaReferenciaFim.toISOString())
    .select('*')
    .orderBy('DataInicioContrato', 'desc')
    .first()
}

export default {
  contratoAtivoByIdColaborador,
  contratosByIdColaborador
}
