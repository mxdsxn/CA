/* eslint-disable no-unused-vars */
import dbConnection, { validationArray, validationObject } from '@database'
import { ICalendario } from '@models'
import libUtc from '@libUtc'

const CalendarioService = {
  /* retorna lista de feriados no mes */
  GetFeriadosByMes: async (idColaborador: number, mesReferencia: Date) => {
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
              .then((listaFeriadosMes: ICalendario[]) => (listaFeriadosMes))
            return listaFeriadosMes
          })
        return listaFeriadosMes
      })
    return validationArray(listaFeriadosMes)
  },
  GetListaFeriadoFinalSemanaByMes: async (idColaborador: number, mesReferencia: Date) => {
    const listaFeriados = await CalendarioService.GetFeriadosByMes(idColaborador, libUtc.getMonth(mesReferencia))
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
      if (dia.getDay() === 6) {
        const result = {
          Descricao: "Sabado",
          Dia: dia
        }
        listaFinalSemana.push(result)
      } else if (dia.getDay() === 0) {
        const result = {
          Descricao: "Domingo",
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

    return (listaResult)
  }
}

export default CalendarioService


interface Dia { Descricao: string; Dia: Date; }