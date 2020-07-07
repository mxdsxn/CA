/* eslint-disable no-unused-vars */
import dbConnection, { validationArray, validationObject } from '@database'
import { ICalendario } from '@models'
import libUtc from '@libUtc'

const CalendarioService = {
  GetFeriadosByMes: async (mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    const listaFeriadosMes = await dbConnection('pessoas.Calendario')
      .select('*')
      .where('Dia', '>=', mesReferenciaInicio)
      .andWhere('Dia', '<=', mesReferenciaFim)
      .orderBy('Dia', 'asc')
      .then((listaFeriadosMes: ICalendario[]) => (listaFeriadosMes))

    return validationArray(listaFeriadosMes)
  },
  GetFeriadoByDia: async (diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)
    const feriadoDia = await dbConnection('pessoas.Calendario')
      .select('*')
      .where('Dia', '>=', diaReferenciaInicio)
      .andWhere('Dia', '<=', diaReferenciaFim)
      .orderBy('Dia', 'asc')
      .first()
      .then((feriadoDia: ICalendario) => (feriadoDia))

    return validationObject(feriadoDia)
  }
}

export default CalendarioService
