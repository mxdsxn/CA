/* eslint-disable no-unused-vars */
import {
  AtividadeEntity,
  ColaboradorContratoEntity,
  CalendarioEntity
} from '@entities'

import {
  CalendarioService,
  ColaboradorContratoService
} from '@services'

import libUtc from '@libUtc'
import moment, { Moment } from 'moment'

import { AtividadeRepository as Repo, ColaboradorContratoRepository, AtividadeFechamentoSemanaRepository, PermissaoHoraExtraRepository, CalendarioRepository, ProjetoRepository, ProjetoCategoriaAtividadeRepository, ProjetoMetodologiaFaseRepository, ColaboradorRepository } from '@repositories'
import { DiaModel, AtividadeModel } from '@models'

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

  const diaCadastro = moment.utc()
  const resultado: { tipo: string, mensagem: [string], atividade?: AtividadeModel } = { tipo: 'Sucesso', mensagem: ['Apontamento cadastrado com sucesso!'] }

  // #region Validaçao de dados referente a Carga, Contrato, Colaborador e Semana

  // Carga Superior a 24h
  /*
   * carga do apontamento nao pode ser superior a 24h
   */

  if (atividade.cargaAtividade.hours() > 24) {
    resultado.mensagem.push('Carga do apontamento invalida.')
  } else {
    // #region Contrato Ativo
    /*
     * é obrigatorio ter contrato ativo no dia da atividade
     */

    const contratoAtivo = await ColaboradorContratoRepository.ContratoAtivoByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.toDate())

    if (!contratoAtivo) {
      resultado.mensagem.push('Não existe contrato ativo nesse dia.')
    } else {
      // #region Carga Horaria Apontamento
      /*
       * apenas cadastrar em dias uteis ou feriados que nao sejam integrais
       * ter permissao para horas extras
       * se for estagiario, só pode cadastrar hora extra para 'hoje' e para o ultimo dia util
       * hora extra nao pode exceder o maximo permitido
       */

      const feriadoDia = await CalendarioRepository.feriadoByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.utcOffset(0, true).format())
      const cargaHorariaDia = feriadoDia
        ? (feriadoDia.HorasUteis < contratoAtivo.CargaHoraria
          ? feriadoDia.HorasUteis
          : contratoAtivo.CargaHoraria)
        : contratoAtivo.CargaHoraria

      if (atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 > cargaHorariaDia * 60) {
        const permissaoHoraExtra = await PermissaoHoraExtraRepository.permissaoHoraExtraByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.utcOffset(0, true).format())

        if (permissaoHoraExtra) {
          const ultimoDiaUtil = moment(atividade.diaAtividade).subtract(1, 'day')
          const feriadosDia = async (x: Moment) => await CalendarioRepository.listaFeriadoNaoUtilByIdColaboradorDia(atividade.idColaborador, x.utcOffset(0, true).format())
          for (let x = 1; x > 0; x) {
            const listaFeriadoUltimoDiaUtil = await feriadosDia(ultimoDiaUtil)
            if (listaFeriadoUltimoDiaUtil.length === 0 && ultimoDiaUtil.weekday() !== 0 && ultimoDiaUtil.weekday() !== 6) {
              x = 0
            } else {
              ultimoDiaUtil.subtract(1, 'day')
            }
          }

          if (contratoAtivo.IdContratoModalidade === 4 && (!ultimoDiaUtil.isSame(atividade.diaAtividade) || !diaCadastro.isSame(atividade.diaAtividade))) {
            resultado.mensagem.push('Estagiarios só podem cadastrar horas extras para Hoje ou para o último dia util')
          } else {
            const cargaMaximaDia = cargaHorariaDia > 0 ? cargaHorariaDia + 2 : 0

            if (atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 > cargaMaximaDia * 60) {
              resultado.mensagem.push('Carga do apontamento excede o máximo permitido por dia.')
            }
          }
        } else {
          resultado.mensagem.push('Você não tem permissão para cadastrar horas extras')
        }
      }

      // #endregion

      // #region Mes Anterior e Semana Anterior da Atividade Fechados
      /*
       * mes anterior deve estar fechado caso o mes anterior nao seja anterior ao contrato ativo
       * semana anterior da atividade deve estar fechada caso nao seja anterior ao contrato ativo
       */

      if (atividade.diaAtividade.isAfter(moment.utc(contratoAtivo.DataInicioContrato).startOf('month').add(1, 'month'))) {
        const mesAnterior = moment(atividade.diaAtividade).subtract(1, 'month')
        const atividadeFechamentoSemanaListaMes = await AtividadeFechamentoSemanaRepository.listaAtividadeFechamentoSemanaByIdColaboradorMesAno(atividade.idColaborador, mesAnterior.month() + 1, mesAnterior.year())

        const mesAnteriorAberto = atividadeFechamentoSemanaListaMes.find(x => x.IdAtividadeFechamentoStatus === 1)
        if (mesAnteriorAberto) {
          resultado.mensagem.push(`Há uma ou mais semanas abertas no mes de ${mesAnterior.locale('pt-br').format('MMMM').toUpperCase()}.`)
        }
      }

      if (atividade.diaAtividade.isAfter(moment.utc(contratoAtivo.DataInicioContrato).add(1, 'week'))) {
        const semanaAnterior = moment(atividade.diaAtividade).subtract(1, 'week')
        const atividadeFechamentoSemanaAnterior = await AtividadeFechamentoSemanaRepository.listaAtividadeFechamentoSemanaByIdColaboradorSemanaAno(atividade.idColaborador, semanaAnterior.isoWeek(), semanaAnterior.year())

        const semanaAnteriorAberta = atividadeFechamentoSemanaAnterior.find(x => x.IdAtividadeFechamentoStatus === 1)
        if (semanaAnteriorAberta) {
          resultado.mensagem.push('Semana anterior está aberta.')
        }
      }

      // #endregion

      // #region Semana da Atividade Aberta
      /*
       * semana da atividade deve estar aberta
       */

      console.log(atividade.diaAtividade, atividade.diaAtividade.isoWeek(), atividade.diaAtividade.month() + 1, atividade.diaAtividade.year())
      const statusSemanaAtividade = await AtividadeFechamentoSemanaRepository.statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno(atividade.idColaborador, atividade.diaAtividade.isoWeek(), atividade.diaAtividade.month() + 1, atividade.diaAtividade.year())

      if (!statusSemanaAtividade || statusSemanaAtividade.IdAtividadeFechamentoStatus !== 1) {
        resultado.mensagem.push('Essa semana não está aberta para cadastrar novos apontamentos.')
      }

      // #endregion
    }

    // #endregion
  }

  // #endregion

  // #region Validaçao de dados referente a Projeto, Fase, Categoria e Coordenador
  const idProjeto = atividade.idProjeto === -1 ? atividade.idProjetoDefault : atividade.idProjeto
  const projeto = await ProjetoRepository.projetoById(idProjeto)

  if (!projeto) {
    resultado.mensagem.push('Projeto não encontrado')
  } else {
    if (atividade.idProjeto === -1) {
      const coordenador = ColaboradorRepository.colaboradorById(atividade.idCoordenador)
      if (!coordenador) {
        resultado.mensagem.push('Selecione um coordenador')
      }
    } else {
      const listaCategoriaAtividade = await ProjetoCategoriaAtividadeRepository.ProjetoCategoriaAtividadeByIdProjeto(idProjeto)
      const categoriaAtividade = await ProjetoCategoriaAtividadeRepository.projetoCategoriaAtividadeById(atividade.idCategoriaAtividade)
      if (listaCategoriaAtividade && !categoriaAtividade) {
        resultado.mensagem.push('Selecione uma categoria para o apontamento')
      }

      const listaProjetoFase = await ProjetoMetodologiaFaseRepository.ProjetoFaseByIdProjeto(idProjeto)
      const projetoFase = await ProjetoMetodologiaFaseRepository.projetoFaseById(atividade.idProjetoFase)
      if (listaProjetoFase && !projetoFase) {
        resultado.mensagem.push('Selecione uma fase para o apontamento')
      }
    }
  }

  // #endregion
  if (resultado.mensagem.length > 1) {
    resultado.tipo = 'Erro'
    resultado.mensagem.shift()
    return (resultado)
  } else {
    return (resultado)
  }
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
