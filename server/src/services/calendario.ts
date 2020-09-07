/* eslint-disable no-unused-vars */
import { DiaModel } from '@models'
import { CalendarioEntity } from '@entities'
import libUtc from '@libUtc'
import { CalendarioRepository as Repo } from '@repositories'
import moment, { Moment } from 'moment'

/* retorna lista de feriados no mes */
const feriadosByIdColaboradorMes = async (idColaborador: number, mesReferencia: Moment) => {
  const listaFeriadosMes = await Repo.feriadosByIdColaboradorMes(idColaborador, mesReferencia)

  return listaFeriadosMes
}

const ListaFeriadoFinalSemanaByMes = async (idColaborador: number, mesReferencia: Moment) => {
  const listaFeriados = await Repo.feriadosByIdColaboradorMes(idColaborador, mesReferencia)
    .then((suc) => {
      const listaFeriadoDia = suc.map(feriado => {
        const result: DiaModel = {
          Descricao: feriado.Descricao,
          Dia: moment(feriado.Dia)
        }
        return result
      })
      return listaFeriadoDia
    })

  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = mesReferencia.endOf('month')

  var listaFinalSemana: DiaModel[] = []

  for (let dia = mesReferenciaInicio; dia.isSameOrBefore(mesReferenciaFim); dia.add(1, 'day')) {
    if (dia.date() === 5) {
      const result: DiaModel = {
        Descricao: 'Sabado',
        Dia: dia
      }
      listaFinalSemana.push(result)
    } else if (dia.date() === 6) {
      const result: DiaModel = {
        Descricao: 'Domingo',
        Dia: dia
      }
      listaFinalSemana.push(result)
    }
  }

  const listaFeriadoDiaDeSemana = listaFeriados.filter(feriado => feriado.Dia.date() !== 6 && feriado.Dia.date() !== 5)

  const listaFeriadoFinalSemana = listaFeriadoDiaDeSemana.concat(listaFinalSemana).sort((x, y) => x.Dia.millisecond() - y.Dia.millisecond())
  return listaFeriadoFinalSemana
}

export default {
  feriadosByIdColaboradorMes,
  ListaFeriadoFinalSemanaByMes
}
