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

    return dbConnection('pessoas.Colaborador')
      .select('*')
      .first()
      .then(
        tst => tst
      )

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
