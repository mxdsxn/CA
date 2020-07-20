/* eslint-disable no-unused-vars */
import dbConnection, { validationArray, validationObject } from '@database'

import {
  IAtividade,
  ICalendario,
  IColaborador,
  IColaboradorContrato,
  IProjetoHistoricoGerente,
} from '@models'

import {
  AtividadeService,
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
  GetHorasUteisMesByIdColaboradorMes: async (idColaborador: number, mesReferencia: Date) => {
    const inicioMes = mesReferencia
    const finalMes = libUtc.getEndMonth(mesReferencia)

    const listaFeriadosMes: ICalendario[] = await CalendarioService.GetFeriadosByMes(idColaborador, inicioMes) || []

    const horasPrevistaMes: number = await ColaboradorContratoService.GetContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
      .then((contratos: IColaboradorContrato[]) => {
        var horasPrevistasMes = 0
        for (var dia = inicioMes; dia <= finalMes; dia = libUtc.addDay(dia)) {

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
  },
  GetHorasUteisAteHojeByIdColaboradorMes: async (idColaborador: number, mesReferencia: Date) => {
    const inicioMes = mesReferencia
    const diaHoje = libUtc.getDate()

    const listaFeriadosMes: ICalendario[] = await CalendarioService.GetFeriadosByMes(idColaborador, inicioMes) || []
    const horasPrevistaAteHoje: number = inicioMes.getTime() === libUtc.getMonth().getTime()
      ?
      await ColaboradorContratoService.GetContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
        .then((contratos: IColaboradorContrato[]) => {
          var horasPrevistaAteHoje = 0
          for (var dia = inicioMes; dia <= diaHoje; dia = libUtc.addDay(dia)) {

            if (dia.getUTCDay() !== 6 && dia.getUTCDay() !== 0) { // se diferente de sabado e domingo
              const cargaContrato = GetCargaHorariaDia(contratos, dia) // carga horaria do contrato naquele dia
              const cargaFeriadoNoDia = GetCargaHorariaFeriado(listaFeriadosMes, dia) // carga horaria se houver feriado

              cargaContrato ? // caso exista carga horaria naquele dia, ou seja, caso existe algum contrato ativo
                horasPrevistaAteHoje += cargaContrato > cargaFeriadoNoDia ? cargaFeriadoNoDia : cargaContrato : null
            }
          }
          return horasPrevistaAteHoje
        })
      :
      0
    return validationObject(horasPrevistaAteHoje)
  },
  GetHorasCadastradasByIdColaboradorMes: async (idColaborador: number, mesReferencia: Date) => {
    const listaAtividadesMes: IAtividade[] = await AtividadeService.GetAtividadesMesByIdColaboradorMes(idColaborador, mesReferencia)

    return GetHorasDecimal(listaAtividadesMes)

  },
  GetDadosBarraProgresso: async (idColaborador: number, mesReferencia: Date) => {
    const horasUteisMes = await ColaboradorService.GetHorasUteisMesByIdColaboradorMes(idColaborador, mesReferencia)
    const horasUteisHoje = await ColaboradorService.GetHorasUteisAteHojeByIdColaboradorMes(idColaborador, mesReferencia)
    const horasCadastradasAteHoje = await ColaboradorService.GetHorasCadastradasByIdColaboradorMes(idColaborador, mesReferencia)

    (horasUteisMes, horasUteisHoje, horasCadastradasAteHoje)
    return [horasUteisMes, horasUteisHoje, horasCadastradasAteHoje]
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

  return (result || 0) as number
}

const GetHorasVetorNumero = (hora: string) => {
  return hora.split(":", 2).map(time => Number(time))
}

const GetSomaHorasVetor = (vetorHoras: number[][]) => {
  let horasTotal = vetorHoras.reduce((total, hora) => total + hora[0], 0)

  let minutosTotal = vetorHoras.reduce((total, minuto) => total + minuto[1], 0)

  return [horasTotal, minutosTotal]
}

const GetHorasDecimal = (listaAtividades: IAtividade[]) => {

  const listaCargaCadastrada = listaAtividades.map(atividade => atividade.Carga)

  const listaHorasVetor = listaCargaCadastrada.map(carga => GetHorasVetorNumero(carga))

  const vetorHora = GetSomaHorasVetor(listaHorasVetor)

  return vetorHora[0] + (vetorHora[1] / 60)
}

export default ColaboradorService
