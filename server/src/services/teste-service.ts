/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import {
  ICalendario, IColaboradorContrato
} from '@models'
import libUtc from '@libUtc'
import { CalendarioService, ColaboradorContratoService } from '@services'

const TesteService = {
  Teste: async (DataCadastro: Date) => {
    const mesReferencia = libUtc.getDateByString('01/01/2020')
    const idColaborador = 2359
    const inicioMes = mesReferencia

    const listaFeriadosMes = await CalendarioService.GetFeriadosByMes(inicioMes)

    const horasPrevistaMes = ColaboradorContratoService.GetContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
      .then((contratos: IColaboradorContrato[]) => {
        const finalMes = libUtc.getEndMonth(mesReferencia)
        var horasPrevistasMes
        for (var dia = inicioMes; dia <= inicioMes; dia = libUtc.addDay(dia)) {
          // const cargaDia = GetCargaHorariaDia(contratos, dia)
          // console.log(dia)
          GetCargaHorariaFeriado(listaFeriadosMes, dia)
        }
        return contratos
      })
  }
}

const GetCargaHorariaFeriado = (listaFeriado: ICalendario[], diaReferencia: Date) => {
  const result = listaFeriado.filter(feriado => feriado.Dia === diaReferencia)
  // .sort((ferA, ferB) => {
  //   return ferA.HorasUteis > ferB.HorasUteis
  //     ? 1 : ferA.HorasUteis < ferB.HorasUteis ? -1 : 0
  // })
  // console.log(diaReferencia)
  // const result = listaFeriado.map(x => console.log(x.Dia))
  console.log(result, diaReferencia, listaFeriado)
}

const GetCargaHorariaDia = (listaContrato: IColaboradorContrato[], diaReferencia: Date) => {
  const result = listaContrato.find(contrato => contrato.DataInicioContrato >= diaReferencia &&
    (contrato.Termino <= diaReferencia || contrato.Termino === null))
    ?.CargaHoraria
  return result
}
export default TesteService
