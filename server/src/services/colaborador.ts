/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {
  AtividadeEntity,
  CalendarioEntity,
  ColaboradorContratoEntity
} from '@entities'

import {
  AtividadeService,
  CalendarioService,
  ColaboradorContratoService
} from '@services'

import { ColaboradorRepository as Repo } from '@repositories'

import libUtc from '@libUtc'
import { AtividadeModel } from '@models'

/* retorna lista de coordenadores(gerentes de projetos), para aprovaçao de atividades em projetos Default */
const CoordenadoresByDia = async (diaReferencia: Date) => {
  const listaCoordenador = await Repo.CoordenadoresByDia(diaReferencia)

  return listaCoordenador
}

const HorasUteisMesByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date) => {
  const inicioMes = mesReferencia
  const finalMes = libUtc.getEndMonth(mesReferencia)

  const listaFeriadosMes: CalendarioEntity[] = await CalendarioService.FeriadosByMes(idColaborador, inicioMes) || []
  const listaContratosMes: ColaboradorContratoEntity[] = await ColaboradorContratoService.ContratosByDataIdColaboradorMes(idColaborador, mesReferencia)

  var horasPrevistasMes = 0

  for (var dia = inicioMes; dia <= finalMes; dia = libUtc.addDay(dia)) {
    if (dia.getUTCDay() !== 6 && dia.getUTCDay() !== 0) { // se diferente de sabado e domingo
      const cargaContrato = CargaHorariaDia(listaContratosMes, dia) // carga horaria do contrato naquele dia
      const cargaFeriadoNoDia = CargaHorariaFeriado(listaFeriadosMes, dia) // carga horaria se houver feriado

      // caso exista carga horaria naquele dia, ou seja, caso existe algum contrato ativo
      cargaContrato
        ? horasPrevistasMes += cargaContrato > cargaFeriadoNoDia
          ? cargaFeriadoNoDia
          : cargaContrato
        : null
    }
  }
  return horasPrevistasMes
}

const HorasUteisAteHojeByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date) => {
  const inicioMes = mesReferencia
  const diaHoje = libUtc.getDate()

  if (inicioMes.getTime() !== libUtc.getMonth().getTime()) { return 0 }

  const listaFeriadosMes: CalendarioEntity[] = await CalendarioService.FeriadosByMes(idColaborador, inicioMes) || []
  const listaContratosMes: ColaboradorContratoEntity[] = await ColaboradorContratoService.ContratosByDataIdColaboradorMes(idColaborador, mesReferencia)

  var horasPrevistaAteHoje = 0
  for (var dia = inicioMes; dia <= diaHoje; dia = libUtc.addDay(dia)) {
    if (dia.getUTCDay() !== 6 && dia.getUTCDay() !== 0) { // se diferente de sabado e domingo
      const cargaContrato = CargaHorariaDia(listaContratosMes, dia) // carga horaria do contrato naquele dia
      const cargaFeriadoNoDia = CargaHorariaFeriado(listaFeriadosMes, dia) // carga horaria se houver feriado

      cargaContrato // caso exista carga horaria naquele dia, ou seja, caso existe algum contrato ativo
        ? horasPrevistaAteHoje += cargaContrato > cargaFeriadoNoDia
          ? cargaFeriadoNoDia
          : cargaContrato
        : null
    }
  }

  return horasPrevistaAteHoje
}

const HorasCadastradasByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date) => {
  const listaAtividadesMes = await AtividadeService.AtividadesByIdColaboradorMes(idColaborador, mesReferencia, true)

  return HorasDecimal(listaAtividadesMes as AtividadeModel[])
}

const DadosBarraProgresso = async (idColaborador: number, mesReferencia: Date) => {
  const horasUteisMes = await HorasUteisMesByIdColaboradorMes(idColaborador, mesReferencia)
  const horasUteisHoje = await HorasUteisAteHojeByIdColaboradorMes(idColaborador, mesReferencia)
  const horasCadastradasAteHoje = await HorasCadastradasByIdColaboradorMes(idColaborador, mesReferencia)
  return { horasUteisMes, horasUteisHoje, horasCadastradasAteHoje }
}

const CargaHorariaFeriado = (listaFeriado: CalendarioEntity[], diaReferencia: Date) => {
  const result = listaFeriado.find(feriado => feriado.Dia.getTime() === diaReferencia.getTime())?.HorasUteis

  return (result !== undefined ? result : 8) as number
}

const CargaHorariaDia = (listaContrato: ColaboradorContratoEntity[], diaReferencia: Date) => {
  const result = listaContrato.find(contrato => diaReferencia >= contrato.DataInicioContrato &&
    (diaReferencia <= contrato.Termino || contrato.Termino === null))
    ?.CargaHoraria

  return (result || 0) as number
}

const HorasVetorNumero = (hora: string) => {
  return hora.split(':', 2).map(time => Number(time))
}

const SomaHorasVetor = (vetorHoras: number[][]) => {
  const horasTotal = vetorHoras.reduce((total, hora) => total + hora[0], 0)

  const minutosTotal = vetorHoras.reduce((total, minuto) => total + minuto[1], 0)

  return [horasTotal, minutosTotal]
}

const HorasDecimal = (listaAtividades: AtividadeModel[]) => {
  const listaCargaCadastrada = listaAtividades.map(atividade => atividade.Carga)

  const listaHorasVetor = listaCargaCadastrada.map(carga => HorasVetorNumero(carga))

  const vetorHora = SomaHorasVetor(listaHorasVetor)

  return vetorHora[0] + (vetorHora[1] / 60)
}

export default {
  CoordenadoresByDia,
  HorasUteisMesByIdColaboradorMes,
  HorasUteisAteHojeByIdColaboradorMes,
  HorasCadastradasByIdColaboradorMes,
  DadosBarraProgresso
}
