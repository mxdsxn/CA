/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { ICalendario } from '@models'
import libUtc from '@libUtc'

const CalendarioService = {
  GetFeriadosByMes: async (mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.utcEndMonth(mesReferenciaInicio)

    const listaFeriadosMes: ICalendario[] = await connKnex('pessoas.Calendario')
      .select('*')
      .where('Dia', '>=', mesReferenciaInicio)
      .andWhere('Dia', '<', mesReferenciaFim)
      .orderBy('Dia', 'asc')
    return (listaFeriadosMes)
  },
  GetFeriadoByDia: async (diaReferencia: Date) => {
    const feriadoDia: ICalendario = await connKnex('pessoas.Calendario')
      .select('*')
      .where({
        Dia: diaReferencia
      })
      .orderBy('Dia', 'asc')
      .first()
    return (feriadoDia)
  }
}

export default CalendarioService
