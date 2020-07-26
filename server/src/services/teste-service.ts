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
    const inicioMes = mesReferencia
    const diaHoje = libUtc.getDate()

    const listaFeriadosMes: ICalendario[] = await CalendarioService.GetFeriadosByMes(idColaborador, inicioMes) || []
    
    const horasPrevistaMes: number = await ColaboradorContratoService.GetContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
      .then((contratos: IColaboradorContrato[]) => {
        var horasPrevistasMes = 0
        for (var dia = inicioMes; dia <= diaHoje; dia = libUtc.addDay(dia)) {

          if (dia.getUTCDay() !== 6 && dia.getUTCDay() !== 0) { // se diferente de sabado e domingo
            const cargaContrato = GetCargaHorariaDia(contratos, dia) // carga horaria do contrato naquele dia
            const cargaFeriadoNoDia = GetCargaHorariaFeriado(listaFeriadosMes, dia) // carga horaria se houver feriado

            cargaContrato ? // caso exista carga horaria naquele dia, ou seja, caso existe algum contrato ativo
              horasPrevistasMes += cargaContrato > cargaFeriadoNoDia ? cargaFeriadoNoDia : cargaContrato : null
          }
        }
        return horasPrevistasMes
      })
    return validationObject(horasPrevistaMes)

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
