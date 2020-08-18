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
    .select('*')
    .where({
      IdColaborador: idColaborador
    })
    .where('DataAtividade', '>=', mesReferenciaInicio)
    .andWhere('DataAtividade', '<', mesReferenciaFim)
    .orderBy('DataAtividade', 'asc')
    .then((listaAtividadeMes: IAtividade[]) => {
      (listaAtividadeMes.map(x => x.DataAtividade))
      const listaIdsProjeto = listaAtividadeMes.map(x => x.IdProjeto)
      const listaAtividadeComNomeProjeto = dbConnection('operacoes.Projeto')
        .select('IdProjeto', 'Nome')
        .whereIn('IdProjeto', listaIdsProjeto)
        .then((listaNomesProjeto: IProjeto[]) => {
          listaAtividadeMes.map(atividade => {
            atividade.Projeto = listaNomesProjeto.filter(nomeProjeto => nomeProjeto.IdProjeto === atividade.IdProjeto)[0].Nome || null
          })

          const listaIdsCategoria = listaAtividadeMes.map(x => x.IdProjetoCategoriaAtividade)
          dbConnection('operacoes.ProjetoCategoriaAtividade')
            .select('IdProjetoCategoriaAtividade', 'Descricao')
            .whereIn('IdProjetoCategoriaAtividade', listaIdsCategoria)
            .then((listaDescricaoCategoria: IProjetoCategoriaAtividade[]) => {
              listaAtividadeMes.map(atividadeCat => {
                if (listaDescricaoCategoria.find(x => x.IdProjetoCategoriaAtividade === atividadeCat.IdProjetoCategoriaAtividade)) {
                  atividadeCat.CategoriaAtividade = listaDescricaoCategoria.filter(x => x.IdProjetoCategoriaAtividade === atividadeCat.IdProjetoCategoriaAtividade)[0].Descricao
                } else {
                  atividadeCat.CategoriaAtividade = ''
                }
              })
            })

          const listaIdsFase = listaAtividadeMes.map(x => x.IdProjetoMetodologiaFase)
          dbConnection('operacoes.ProjetoMetodologiaFase')
            .select('IdProjetoMetodologiaFase', 'Fase')
            .whereIn('IdProjetoMetodologiaFase', listaIdsFase)
            .then((listaFaseProjeto: IProjetoMetodologiaFase[]) => {
              listaAtividadeMes.map(atividadeFase => {
                if (listaFaseProjeto.find(x => x.IdProjetoMetodologiaFase === atividadeFase.IdProjetoMetodologiaFase)) { atividadeFase.FaseProjeto = listaFaseProjeto.filter(x => x.IdProjetoMetodologiaFase === atividadeFase.IdProjetoMetodologiaFase)[0].Fase } else { atividadeFase.FaseProjeto = '' }
              })
            })

          return listaAtividadeMes
        })
      return listaAtividadeComNomeProjeto
    })

  if (!naoAgruparDia) {
    const listaFeriadosFds = await CalendarioService.ListaFeriadoFinalSemanaByMes(idColaborador, mesReferencia)
    const listaContratosMes = await ColaboradorContratoService.ContratosByDataIdColaboradorMes(idColaborador, mesReferencia)
    return AgruparAtividadesPorDia(mesReferencia, listaAtividadeMes, listaFeriadosFds, listaContratosMes)
  }

  return listaAtividadeMes
}

const AtividadesByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const listaAtividadeMes = await dbConnection('pessoas.Atividade')
    .select('*')
    .where({
      IdColaborador: idColaborador
    })
    .where('DataAtividade', diaReferencia)
    .orderBy('DataAtividade', 'asc')
    .then((listaAtividadeMes: IAtividade[]) => {
      (listaAtividadeMes.map(x => x.DataAtividade))
      const listaIdsProjeto = listaAtividadeMes.map(x => x.IdProjeto)
      const listaAtividadeComNomeProjeto = dbConnection('operacoes.Projeto')
        .select('IdProjeto', 'Nome')
        .whereIn('IdProjeto', listaIdsProjeto)
        .then((listaNomesProjeto: IProjeto[]) => {
          listaAtividadeMes.map(atividade => {
            atividade.Projeto = listaNomesProjeto.filter(nomeProjeto => nomeProjeto.IdProjeto === atividade.IdProjeto)[0].Nome
          })
          return listaAtividadeMes
        })
      return listaAtividadeComNomeProjeto
    })
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