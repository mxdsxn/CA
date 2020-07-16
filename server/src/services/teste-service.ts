/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'

import {
  ICalendario,
  IColaboradorContrato
} from '@models'

import { CalendarioService, ColaboradorContratoService } from '@services'

import libUtc from '@libUtc'

const TesteService = {
  Teste: async (DataCadastro: Date) => {
    const mesReferencia = libUtc.getDateByString('01/01/2020')
    const idColaborador = 2359
    const inicioMes = mesReferencia
    const finalMes = libUtc.getEndMonth(mesReferencia)

    const listaFeriadosMes = await CalendarioService.GetFeriadosByMes(inicioMes)

    const horasPrevistaMes = await ColaboradorContratoService.GetContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
      .then((contratos: IColaboradorContrato[]) => {
        var horasPrevistasMes = 0
        for (var dia = inicioMes; dia <= finalMes; dia = libUtc.addDay(dia)) {
          if (dia.getUTCDay() !== 6 && dia.getUTCDay() !== 0) { // se diferente de sabado e domingo
            const cargaDia = GetCargaHorariaDia(contratos, dia) // carga horaria do contrato naquele dia
            const cargaFeriadoNoDia = GetCargaHorariaFeriado(listaFeriadosMes, dia) // carga horaria se houver feriado

            cargaDia ? // caso exista carga horaria naquele dia, ou seja, caso existe algum contrato ativo
              horasPrevistasMes += cargaDia > cargaFeriadoNoDia ? cargaFeriadoNoDia : cargaDia : null
          }
        }
        return horasPrevistasMes
      })
    console.log(horasPrevistaMes)
  }
}

const GetCargaHorariaFeriado = (listaFeriado: ICalendario[], diaReferencia: Date) => {
  const result = listaFeriado.find(feriado => feriado.Dia.getTime() === diaReferencia.getTime())?.HorasUteis

  return (result || 8) as number
}

const GetCargaHorariaDia = (listaContrato: IColaboradorContrato[], diaReferencia: Date) => {
  const result = listaContrato.find(contrato => diaReferencia >= contrato.DataInicioContrato &&
    (diaReferencia <= contrato.Termino || contrato.Termino === null))
    ?.CargaHoraria
  return (result || null) as number
}

export default TesteService
