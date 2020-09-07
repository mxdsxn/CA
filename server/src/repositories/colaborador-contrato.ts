/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { ColaboradorContratoEntity } from '@entities'
import moment, { Moment } from 'moment'

const contratosByIdColaborador = async (idColaborador: Number, mesReferencia: Moment): Promise<ColaboradorContratoEntity[]> => {
  const mesReferenciaFim = moment(mesReferencia).endOf('month')

  return await dbConnection('pessoas.ColaboradorContrato')
    .where('IdColaborador', Number(idColaborador))
    .andWhere(function () {
      this.where('Termino', '>=', mesReferencia.toISOString())
        .orWhere('Termino', null)
    })
    .andWhere('DataInicioContrato', '<=', mesReferenciaFim.toISOString())
    .select('*')
    .orderBy('DataInicioContrato', 'asc')
}

const contratoAtivoByIdColaborador = async (idColaborador: Number, diaReferencia: Moment): Promise<ColaboradorContratoEntity> => {
  const diaReferenciaFim = moment(diaReferencia).endOf('day')

  return await dbConnection('pessoas.ColaboradorContrato')
    .where('IdColaborador', idColaborador)
    .andWhere(function () {
      this.where('Termino', '>=', diaReferencia.toISOString())
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
