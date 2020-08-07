/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { DiaEntity } from '@entities'
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
  GetFeriadosByMes,
  GetListaFeriadoFinalSemanaByMes
}
