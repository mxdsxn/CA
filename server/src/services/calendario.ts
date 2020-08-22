/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { DiaEntity } from '@entities'
import { ICalendario } from '@models'
import libUtc from '@libUtc'

/* retorna lista de feriados no mes */
const FeriadosByMes = async (idColaborador: number, mesReferencia: Date) => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  const listaFeriadosMes = await dbConnection('pessoas.Colaborador')
    .select('pessoas.Calendario.*')
    .innerJoin('pessoas.PostoTrabalho', 'pessoas.PostoTrabalho.IdPostoTrabalho', 'pessoas.Colaborador.IdPostoTrabalho')
    .innerJoin('pessoas.Calendario', function () {
      this.on('pessoas.PostoTrabalho.IdCidade', 'pessoas.Calendario.IdCidade')
        .orOn('pessoas.PostoTrabalho.IdEstado', 'pessoas.Calendario.IdEstado')
        .orOn('pessoas.PostoTrabalho.IdPais', 'pessoas.Calendario.IdPais')
    })
    .where('pessoas.Colaborador.IdColaborador', idColaborador)
    .andWhere('pessoas.Calendario.Dia', '>=', mesReferenciaInicio)
    .andWhere('pessoas.Calendario.Dia', '<', mesReferenciaFim)
    .orderBy('pessoas.Calendario.Dia', 'asc')

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
