/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { ICalendario } from '@models'
import libUtc from '@libUtc'

/* retorna lista de feriados no mes */
const GetFeriadosByMes = async (idColaborador: number, mesReferencia: Date) => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  const listaFeriadosMes = await dbConnection('pessoas.Colaborador')
    .select('IdPostoTrabalho')
    .where('IdColaborador', idColaborador)
    .first()
    .then(ColaboradorPostoTrabalho => {
      const idPostoTrabalho = Number(ColaboradorPostoTrabalho.IdPostoTrabalho)
      const listaFeriadosMes = dbConnection('pessoas.PostoTrabalho')
        .where('IdPostoTrabalho', idPostoTrabalho)
        .first()
        .then(PostoTrabalho => {
          const listaFeriadosMes = dbConnection('pessoas.Calendario')
            .select('*')
            .where('Dia', '>=', mesReferenciaInicio)
            .andWhere('Dia', '<=', mesReferenciaFim)
            .andWhere(function () {
              this.where('IdCidade', PostoTrabalho.IdCidade)
                .orWhere('IdEstado', PostoTrabalho.IdEstado)
                .orWhere('IdPais', PostoTrabalho.IdPais)
            })
            .orderBy('Dia', 'asc')
            .then((listaFeriadosMes: ICalendario[]) => (listaFeriadosMes) || null)
          return listaFeriadosMes
        })
      return listaFeriadosMes
    })
  return listaFeriadosMes
}

const GetListaFeriadoFinalSemanaByMes = async (idColaborador: number, mesReferencia: Date) => {
  const listaFeriados = await GetFeriadosByMes(idColaborador, libUtc.getMonth(mesReferencia))
    .then((suc: ICalendario[]) =>
      suc.map(feriado => {
        return {
          Descricao: feriado.Descricao,
          Dia: feriado.Dia
        }
      })
    )

  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)
  var listaFinalSemana: Dia[] = []

  for (let dia = mesReferenciaInicio; dia < mesReferenciaFim; dia = libUtc.addDay(dia)) {
    if (dia.getDay() === 5) {
      const result = {
        Descricao: 'Sabado',
        Dia: dia
      }
      listaFinalSemana.push(result)
    } else if (dia.getDay() === 6) {
      const result = {
        Descricao: 'Domingo',
        Dia: dia
      }
      listaFinalSemana.push(result)
    }
  }
  const listaResult = [].concat(listaFeriados.map(feriado =>
    listaFinalSemana.find(fds =>
      fds.Dia.getTime() === feriado.Dia.getTime()
    )
      ? undefined
      : feriado
  ), listaFinalSemana)

  return listaResult || []
}

export default {
  GetFeriadosByMes,
  GetListaFeriadoFinalSemanaByMes
}

interface Dia { Descricao: string; Dia: Date; }
