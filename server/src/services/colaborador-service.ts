/* eslint-disable no-unused-vars */
import dbConnection, { validationArray, validationObject } from '@database'

import {
  ICalendario,
  IColaboradorContrato,
  IColaborador,
  IProjetoHistoricoGerente
} from '@models'

import {
  CalendarioService,
  ColaboradorContratoService
} from '@services'

import libUtc from '@libUtc'


const ColaboradorService = {
  /* retorna lista de coordenadores(gerentes de projetos), para aprovaçao de atividades em projetos Default */
  GetCoordenadoresByDia: async (diaReferencia: Date) => {
    const mesReferenciaInicio = libUtc.getMonth(diaReferencia)
    const mesReferenciaFim = libUtc.getEndMonth(diaReferencia)

    const listaCoordenador = await dbConnection('operacoes.ProjetoHistoricoGerente')
      .select(
        'IdProjetoHistoricoGerente',
        'IdColaborador',
        'IdProjeto',
        'DataInicio'
      )
      .where('DataInicio', '<=', mesReferenciaFim)
      .andWhere(function () {
        this.where('DataFim', '>=', mesReferenciaInicio)
          .orWhere('DataFim', null)
      })
      .orderBy('DataInicio', 'desc')
      .distinct()
      .then((listaHistoricoGerente: IProjetoHistoricoGerente[]) => {
        const listaIdColaboradorGerente = listaHistoricoGerente.map(gerente => gerente.IdColaborador)

        const listaCoordenador = dbConnection('pessoas.Colaborador')
          .select(
            'IdColaborador',
            'Nome'
          )
          .whereIn('IdColaborador', listaIdColaboradorGerente)
          .orderBy('Nome', 'asc')
          .then((listaCoordenador: IColaborador[]) => (listaCoordenador))

        return listaCoordenador
      })

    return validationArray(listaCoordenador)
  },
  GetHorasUteisMesByIdColaborador: async (idColaborador: number, mesReferencia: Date) => {
    const inicioMes = mesReferencia
    const finalMes = libUtc.getEndMonth(mesReferencia)

    const listaFeriadosMes: ICalendario[] = await CalendarioService.GetFeriadosByMes(inicioMes)

    const horasPrevistaMes: number = await ColaboradorContratoService.GetContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
      .then((contratos: IColaboradorContrato[]) => {
        var horasPrevistasMes = 0
        for (var dia = inicioMes; dia <= finalMes; dia = libUtc.addDay(dia)) {

          if (dia.getUTCDay() !== 6 && dia.getUTCDay() !== 0) { // se diferente de sabado e domingo
            const cargaContrato = GetCargaHorariaDia(contratos, dia) // carga horaria do contrato naquele dia
            const cargaFeriadoNoDia = GetCargaHorariaFeriado(listaFeriadosMes, dia) // carga horaria se houver feriado

            console.log(dia, cargaFeriadoNoDia)
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

  return (result !== undefined ? result : 8) as number
}

const GetCargaHorariaDia = (listaContrato: IColaboradorContrato[], diaReferencia: Date) => {
  const result = listaContrato.find(contrato => diaReferencia >= contrato.DataInicioContrato &&
    (diaReferencia <= contrato.Termino || contrato.Termino === null))
    ?.CargaHoraria
  return (result || 8) as number
}

export default ColaboradorService
