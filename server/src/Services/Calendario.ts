/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { ICalendario } from '@models'
import timeUtc from '@timeUtc'

const CalendarioService = {
  GetFeriadosByMes: async (mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

    const listaFeriadosMes: ICalendario[] = await connKnex('pessoas.Calendario')
      .select('*')
      .where('Dia', '>=', mesReferenciaInicio)
      .andWhere('Dia', '<', mesReferenciaFim)
    return (listaFeriadosMes)
  },
  GetFeriadoByDia: async (diaReferencia: Date) => {
    const listaFeriadosMes: ICalendario[] = await connKnex('pessoas.Calendario')
      .select('*')
      .where({
        Dia: diaReferencia
      })
      .first()
    return (listaFeriadosMes)
  }
}

export default CalendarioService
