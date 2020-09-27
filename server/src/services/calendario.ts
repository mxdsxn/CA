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


  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = moment(mesReferencia).endOf('month')

  const listaFinalSemana: DiaModel[] = []

  for (let dia = mesReferenciaInicio; dia.isBefore(mesReferenciaFim); dia = moment(dia).add(1, 'day')) {
    if (dia.weekday() === 6) {
      const result = {
        Descricao: 'Sabado',
        Dia: moment(dia)
      }
      listaFinalSemana.push(result)
    } else if (dia.weekday() === 0) {
      const result = {
        Descricao: 'Domingo',
        Dia: moment(dia)
      }
      listaFinalSemana.push(result)
    }
  }

  const listaFeriadoDiaDeSemana: DiaModel[] = listaFeriados.
    filter(feriado => feriado.Dia.getDate() !== 6 && feriado.Dia.getDate() !== 0)
    .map(x => ({ Descricao: x.Descricao, Dia: moment(x.Dia) }))

  const listaFeriadoFinalSemana = listaFinalSemana.concat(listaFeriadoDiaDeSemana)
    .sort((a, b) => a.Dia.valueOf() - b.Dia.valueOf())

  return listaFeriadoFinalSemana
}

export default {
  feriadosByIdColaboradorMes,
  ListaFeriadoFinalSemanaByMes
}
