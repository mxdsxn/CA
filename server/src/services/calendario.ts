/* eslint-disable no-unused-vars */
import { DiaModel } from '@models'
import { CalendarioEntity } from '@entities'
import libUtc from '@libUtc'
import { CalendarioRepository as Repo } from '@repositories'

/* retorna lista de feriados no mes */
const feriadosByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date) => {
  const listaFeriadosMes = await Repo.feriadosByIdColaboradorMes(idColaborador, mesReferencia)

  return listaFeriadosMes
}

const ListaFeriadoFinalSemanaByMes = async (idColaborador: number, mesReferencia: Date) => {
  const listaFeriados = await Repo.feriadosByIdColaboradorMes(idColaborador, libUtc.getMonth(mesReferencia))
    .then((suc) => {
      const listaFeriadoDia = suc.map(feriado => {
        const result: DiaModel = {
          Descricao: feriado.Descricao,
          Dia: feriado.Dia
        }
        return result
      })
      return listaFeriadoDia
    })

  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  var listaFinalSemana: DiaModel[] = []

  for (let dia = mesReferenciaInicio; dia < mesReferenciaFim; dia = libUtc.addDay(dia)) {
    if (dia.getDay() === 5) {
      const result: DiaModel = {
        Descricao: 'Sabado',
        Dia: dia
      }
      listaFinalSemana.push(result)
    } else if (dia.getDay() === 6) {
      const result: DiaModel = {
        Descricao: 'Domingo',
        Dia: dia
      }
      listaFinalSemana.push(result)
    }
  }

  const listaFeriadoDiaDeSemana = listaFeriados.filter(feriado => feriado.Dia.getDay() !== 6 && feriado.Dia.getDay() !== 5)

  const listaFeriadoFinalSemana = listaFeriadoDiaDeSemana.concat(listaFinalSemana).sort((x, y) => x.Dia.getTime() - y.Dia.getTime())
  return listaFeriadoFinalSemana
}

export default {
  feriadosByIdColaboradorMes,
  ListaFeriadoFinalSemanaByMes
}
