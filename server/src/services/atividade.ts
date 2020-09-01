/* eslint-disable no-unused-vars */
import {
  AtividadeEntity,
  ColaboradorContratoEntity
} from '@entities'

import {
  CalendarioService,
  ColaboradorContratoService
} from '@services'

import libUtc from '@libUtc'
import moment, { Moment } from 'moment'

import { AtividadeRepository as Repo, ColaboradorContratoRepository, AtividadeFechamentoSemanaRepository } from '@repositories'
import { DiaModel } from '@models'

/* retorna lista de atividades do colaborador em um mes */
const AtividadesByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date, naoAgruparDia?: boolean) => {
  const listaAtividadeMes = await Repo.AtividadesByIdColaboradorMes(idColaborador, mesReferencia)

  if (!naoAgruparDia && listaAtividadeMes.length > 0) {
    const listaFeriadosFds = await CalendarioService.ListaFeriadoFinalSemanaByMes(idColaborador, mesReferencia)
    const listaContratosMes = await ColaboradorContratoService.ContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
    return AgruparAtividadesPorDia(mesReferencia, listaAtividadeMes, listaFeriadosFds, listaContratosMes)
  }

  return listaAtividadeMes
}

const AtividadesByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const listaAtividadeDia = await Repo.AtividadesByIdColaboradorDia(idColaborador, diaReferencia)

  return listaAtividadeDia
}

const SalvarAtividade = async (
  atividade: {
    idColaborador: number,
    idAtividade: number,
    diaAtividade: Moment,
    cargaAtividade: Moment,
    idProjeto: number,
    idProjetoDefault: number,
    idCoordenador: number,
    idProjetoFase: number,
    idCategoriaAtividade: number,
    tagsAtividade: [string],
    descricaoAtividade: string
  }
) => {
  // console.log('idAtividade:', atividade.idAtividade)
  // console.log('diaAtividade', atividade.diaAtividade.toDate())
  // console.log('cargaAtividade:', atividade.cargaAtividade.toDate())
  // console.log('idProjeto:', atividade.idProjeto)
  // console.log('idProjetoDefault:', atividade.idProjetoDefault)
  // console.log('idCoordenador:', atividade.idCoordenador)
  // console.log('idProjetoFase:', atividade.idProjetoFase)
  // console.log('idCategoriaAtividade:', atividade.idCategoriaAtividade)
  // console.log('tagsAtividade:', atividade.tagsAtividade)
  // console.log('descricaoAtividade:', atividade.descricaoAtividade)
  const resultado: { tipo: string, mensagem: [string] } = { tipo: 'Sucesso', mensagem: ['Apontamento cadastrado com sucesso!'] }

  if (atividade.cargaAtividade.hours() > 24) { resultado.mensagem.push('Carga da atividade invalida.') }

  const contratoAtivo = await ColaboradorContratoRepository.ContratoAtivoByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.toDate())
  if (!contratoAtivo) { resultado.mensagem.push('Não existe contrato ativo nesse dia.') }

  const cargaMaxima = contratoAtivo.CargaHoraria + 2
  if (atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 > cargaMaxima * 60) { resultado.mensagem.push('Carga do apontamento excede o máximo permitido por dia.') }

  if (contratoAtivo.DataInicioContrato.getUTCMonth() + 1 < atividade.diaAtividade.month() + 1 || contratoAtivo.DataInicioContrato.getUTCFullYear() < atividade.diaAtividade.year()) {
    const mesAnterior = moment(atividade.diaAtividade).subtract(1, 'month')
    const atividadeFechamentoSemanaListaMes = await AtividadeFechamentoSemanaRepository.atividadeFechamentoSemanaByIdColaboradorMesAno(atividade.idColaborador, mesAnterior.month() + 1, mesAnterior.year())

    const mesAnteriorAberto = atividadeFechamentoSemanaListaMes.find(x => x.IdAtividadeFechamentoStatus === 1)
    if (mesAnteriorAberto) { resultado.mensagem.push(`Há uma ou mais semanas abertas no mes de ${mesAnterior.locale('pt-br').format('MMMM').toUpperCase()}.`) }
  }

  const statusSemanaAtividade = await AtividadeFechamentoSemanaRepository.statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno(atividade.idColaborador, atividade.diaAtividade.week(), atividade.diaAtividade.month() + 1, atividade.diaAtividade.year())
  if (statusSemanaAtividade.IdAtividadeFechamentoStatus !== 1) { resultado.mensagem.push('Essa semana não está aberta para cadastrar novos apontamentos.') }

  const semanaAnterior = moment(atividade.diaAtividade).subtract(1, 'week')
  const atividadeFechamentoSemanaAnterior = await AtividadeFechamentoSemanaRepository.atividadeFechamentoSemanaByIdColaboradorSemanaAno(atividade.idColaborador, semanaAnterior.week(), semanaAnterior.year())

  const semanaAnteriorAberta = atividadeFechamentoSemanaAnterior.find(x => x.IdAtividadeFechamentoStatus === 1)
  if (semanaAnteriorAberta) { resultado.mensagem.push('Semana anterior está aberta.') }

  console.log(resultado)
}

const AgruparAtividadesPorDia = (mesReferencia: Date, listaAtividade: AtividadeEntity[], listaFeriadosFds: DiaModel[], listaContratos: ColaboradorContratoEntity[]): DiaModel[] => {
  const contrato = listaContratos[0]

  const inicioMes = mesReferencia.getUTCMonth() === contrato.DataInicioContrato.getUTCMonth() &&
    mesReferencia.getUTCFullYear() === contrato.DataInicioContrato.getUTCFullYear()
    ? libUtc.getDate(contrato.DataInicioContrato)
    : libUtc.getMonth(mesReferencia)

  const fimMes = libUtc.getEndMonth(inicioMes).getTime() === libUtc.getEndMonth().getTime()
    ? libUtc.getEndDate()
    : libUtc.getEndMonth(inicioMes)

  const listaAtividadePorDia: DiaModel[] = []

  for (let dia = inicioMes; dia <= fimMes; dia = libUtc.addDay(dia)) {
    const atividadesDia = listaAtividade.filter(x => x.DataAtividade.getTime() === dia.getTime())
    const descricao = listaFeriadosFds.find(x => x.Dia.getTime() === dia.getTime())?.Descricao || null

    const result: DiaModel = {
      Dia: dia,
      Descricao: descricao,
      Atividades: atividadesDia
    }

    listaAtividadePorDia.push(result)
  }
  return listaAtividadePorDia
}

export default {
  SalvarAtividade,
  AtividadesByIdColaboradorMes,
  AtividadesByIdColaboradorDia
}
