import connKnex from '@database'
import { ICalendario } from '@models'

const CalendarioService = {
  GetFeriadosDoData: async (Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim =
      mesReferenciaInicio.getMonth() < 11
        ? new Date(
          `${
          mesReferenciaInicio.getMonth() + 2
          }/1/${mesReferenciaInicio.getFullYear()}`
        )
        : mesReferenciaInicio.getMonth() === 11
          ? new Date(`1/1/${mesReferenciaInicio.getFullYear() + 1}`)
          : new Date()
    console.log(mesReferenciaInicio, mesReferenciaFim)
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
