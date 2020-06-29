import connKnex from '@database'
import { ICalendario } from '@models'
import timeUtc from '@timeUtc'

const CalendarioService = {
  GetFeriadosDoData: async (Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

    const feriadosMes: ICalendario[] = await connKnex('pessoas.Calendario')
      .select('*')
      .where('Dia', '>=', mesReferenciaInicio)
      .andWhere('Dia', '<', mesReferenciaFim)
    return (feriadosMes)
  },
  GetFeriadoByDia: async (Dia: Date) => {
    const feriadosMes: ICalendario[] = await connKnex('pessoas.Calendario')
      .select('*')
      .where({ Dia: Dia })
      .first()
    return (feriadosMes)
  }
}

export default CalendarioService
