/* eslint-disable no-unused-vars */
import { DiaEntity } from '@entities'
import { ICalendario } from '@models'
import libUtc from '@libUtc'
import { CalendarioRepository as Repo } from '@repositories'

/* retorna lista de feriados no mes */
const FeriadosByMes = async (idColaborador: number, mesReferencia: Date) => {
  const listaFeriadosMes = await Repo.FeriadosByMes(idColaborador, mesReferencia)

  return listaFeriadosMes
}

const ListaFeriadoFinalSemanaByMes = async (idColaborador: number, mesReferencia: Date) => {
  const listaFeriados = await FeriadosByMes(idColaborador, libUtc.getMonth(mesReferencia))
    .then((suc: ICalendario[]) => {
      const listaFeriadoDia = suc.map(feriado => {
        const result: DiaEntity = {
          Descricao: feriado.Descricao,
          Dia: feriado.Dia
        }
        return result
      })
      return listaFeriadoDia
    })

  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)
  var listaFinalSemana: DiaEntity[] = []

  for (let dia = mesReferenciaInicio; dia < mesReferenciaFim; dia = libUtc.addDay(dia)) {
    if (dia.getDay() === 5) {
      const result: DiaEntity = {
        Descricao: 'Sabado',
        Dia: dia
      }
      listaFinalSemana.push(result)
    } else if (dia.getDay() === 6) {
      const result: DiaEntity = {
        Descricao: 'Domingo',
        Dia: dia
      }
      listaFinalSemana.push(result)
    }
  }
  const listaFeriadoFiltrado = listaFeriados.filter(feriado => feriado.Dia.getDay() !== 6 && feriado.Dia.getDay() !== 5)

  const listaResult = listaFeriadoFiltrado.concat(listaFinalSemana).sort((x, y) => x.Dia.getTime() - y.Dia.getTime())
  return listaResult
}

export default {
  FeriadosByMes,
  ListaFeriadoFinalSemanaByMes
}
