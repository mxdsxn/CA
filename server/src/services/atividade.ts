/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import {
  IAtividade,
  IColaboradorContrato,
  IProjeto,
  IProjetoCategoriaAtividade,
  IProjetoMetodologiaFase
} from '@models'

import {
  CalendarioService,
  ColaboradorContratoService
} from '@services'

import libUtc from '@libUtc'
import { Moment } from 'moment'

/* retorna lista de atividades do colaborador em um mes */
const AtividadesByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date, naoAgruparDia?: boolean) => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  const listaAtividadeMes = await dbConnection('pessoas.Atividade')
    .select(
      'pessoas.Atividade.*',
      'operacoes.Projeto.Nome',
      'operacoes.ProjetoCategoriaAtividade.Descricao as Categoria',
      'operacoes.ProjetoMetodologiaFase.Fase'
    )
    .innerJoin('operacoes.Projeto', 'operacoes.Projeto.IdProjeto', 'pessoas.Atividade.IdProjeto')
    .fullOuterJoin('operacoes.ProjetoCategoriaAtividade', 'operacoes.ProjetoCategoriaAtividade.IdProjetoCategoriaAtividade', 'pessoas.Atividade.IdProjetoCategoriaAtividade')
    .fullOuterJoin('operacoes.ProjetoMetodologiaFase', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase', 'pessoas.Atividade.IdProjetoMetodologiaFase')
    .where('pessoas.Atividade.IdColaborador', idColaborador)
    .andWhere('pessoas.Atividade.DataAtividade', '>=', mesReferenciaInicio)
    .andWhere('pessoas.Atividade.DataAtividade', '<', mesReferenciaFim)
    .orderBy('pessoas.Atividade.DataAtividade', 'asc')

  if (!naoAgruparDia) {
    const listaFeriadosFds = await CalendarioService.ListaFeriadoFinalSemanaByMes(idColaborador, mesReferencia)
    const listaContratosMes = await ColaboradorContratoService.ContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
    return AgruparAtividadesPorDia(mesReferencia, listaAtividadeMes, listaFeriadosFds, listaContratosMes)
  }

  return listaAtividadeMes
}

const AtividadesByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const listaAtividadeMes = await dbConnection('pessoas.Atividade')
    .select(
      'pessoas.Atividade.*',
      'operacoes.Projeto.Nome',
      'operacoes.ProjetoCategoriaAtividade.Descricao as Categoria',
      'operacoes.ProjetoMetodologiaFase.Fase'
    )
    .innerJoin('operacoes.Projeto', 'operacoes.Projeto.IdProjeto', 'pessoas.Atividade.IdProjeto')
    .fullOuterJoin('operacoes.ProjetoCategoriaAtividade', 'operacoes.ProjetoCategoriaAtividade.IdProjetoCategoriaAtividade', 'pessoas.Atividade.IdProjetoCategoriaAtividade')
    .fullOuterJoin('operacoes.ProjetoMetodologiaFase', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase', 'pessoas.Atividade.IdProjetoMetodologiaFase')
    .where('pessoas.Atividade.IdColaborador', idColaborador)
    .andWhere('pessoas.Atividade.DataAtividade', diaReferencia)
    .orderBy('pessoas.Atividade.DataAtividade', 'asc')

  return (listaAtividadeMes)
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
