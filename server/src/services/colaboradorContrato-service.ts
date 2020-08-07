/* eslint-disable no-unused-vars */
import dbConnection  from '@database'
import { IColaboradorContrato } from '@models'
import libUtc from '@libUtc'

/* retorna lista de contratos num mes para calculo de horas */
const GetContratosByDataIdColaboradorMes = async (idColaborador: Number, mesReferencia: Date) => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  const listaContrato = await dbConnection('pessoas.ColaboradorContrato')
    .select('*')
    .where('IdColaborador', Number(idColaborador))
    .andWhere(function () {
      this.where('Termino', '>=', mesReferenciaInicio)
        .orWhere('Termino', null)
    })
    .andWhere('DataInicioContrato', '<=', mesReferenciaFim)
    .orderBy('DataInicioContrato', 'desc')
    .then((listaContrato: IColaboradorContrato[]) => listaContrato)

  return (listaContrato)
}
/* retorna contrato ativo no dia para carga horaria diaria */
const GetContratoAtivoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const diaReferenciaInicio = diaReferencia
  const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)
  const contratoAtivo = await dbConnection('pessoas.ColaboradorContrato')
    .select('*')
    .where('IdColaborador', idColaborador)
    .andWhere('DataInicioContrato', '<=', diaReferenciaFim)
    .andWhere(function () {
      this.where('Termino', '>=', diaReferenciaInicio)
        .orWhere('Termino', null)
    })
    .orderBy('DataInicioContrato', 'desc')
    .first()
    .then((contratoAtivo: IColaboradorContrato) => contratoAtivo)

  return (contratoAtivo)
}

export default {
  GetContratosByDataIdColaboradorMes,
  GetContratoAtivoByIdColaboradorDia
}
