/* eslint-disable no-unused-vars */
import {
  IAtividade,
  IColaboradorContrato
} from '@models'

import {
  CalendarioService,
  ColaboradorContratoService
} from '@services'

import { AtividadeRepository as Repo } from '@repositories'

import libUtc from '@libUtc'
import { Moment } from 'moment'

/* retorna lista de atividades do colaborador em um mes */
const AtividadesByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date, naoAgruparDia?: boolean) => {
  const listaAtividadeMes = await Repo.AtividadesByIdColaboradorMes(idColaborador, mesReferencia)

  if (!naoAgruparDia) {
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
) => {
  console.log('idAtividade:', idAtividade)
  console.log('diaAtividade', diaAtividade.toDate())
  console.log('cargaAtividade:', cargaAtividade.toDate())
  console.log('idProjeto:', idProjeto)
  console.log('idProjetoDefault:', idProjetoDefault)
  console.log('idCoordenador:', idCoordenador)
  console.log('idProjetoFase:', idProjetoFase)
  console.log('idCategoriaAtividade:', idCategoriaAtividade)
  console.log('tagsAtividade:', tagsAtividade)
  console.log('descricaoAtividade:', descricaoAtividade)
}

const AgruparAtividadesPorDia = (mesReferencia: Date, listaAtividade: IAtividade[], listaFeriadosFds: any, listaContratos: any) => {
  const contrato = listaContratos[0] as IColaboradorContrato

  const inicioMes = mesReferencia.getUTCMonth() === contrato.DataInicioContrato.getUTCMonth() &&
    mesReferencia.getUTCFullYear() === contrato.DataInicioContrato.getUTCFullYear()
    ? libUtc.getDate(contrato.DataInicioContrato)
    : libUtc.getMonth(mesReferencia)

  const fimMes = libUtc.getEndMonth(inicioMes).getTime() === libUtc.getEndMonth().getTime()
    ? libUtc.getEndDate()
    : libUtc.getEndMonth(inicioMes)

  const listaAtividadePorDia: object[] = [{}]
  listaAtividadePorDia.pop()

  for (let dia = inicioMes; dia <= fimMes; dia = libUtc.addDay(dia)) {
    const atividadesDia = listaAtividade.filter(x => x.DataAtividade.getTime() === dia.getTime())
    const descricao = listaFeriadosFds.find((x: { Dia: { getTime: () => number } }) => x.Dia.getTime() === dia.getTime())
      ? listaFeriadosFds.find((x: { Dia: { getTime: () => number } }) => x.Dia.getTime() === dia.getTime()).Descricao
      : null
    const result = { dia, atividadesDia, descricao }

    listaAtividadePorDia.push(result)
  }
  return (listaAtividadePorDia)
}

export default {
  SalvarAtividade,
  AtividadesByIdColaboradorMes,
  AtividadesByIdColaboradorDia
}
