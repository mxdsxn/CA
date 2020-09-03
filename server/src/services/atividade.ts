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

import { AtividadeRepository as Repo, ColaboradorContratoRepository, AtividadeFechamentoSemanaRepository, PermissaoHoraExtraRepository, CalendarioRepository, ProjetoRepository, ProjetoCategoriaAtividadeRepository, ProjetoMetodologiaFaseRepository, ColaboradorRepository, AtividadeRepository } from '@repositories'
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
  console.log(atividade)

  const novaAtividade: AtividadeEntity = {
    IdAtividade: 0,
    IdColaborador: atividade.idColaborador,
    IdProjeto: 0,
    IdProjetoCategoriaAtividade: 0,
    IdProjetoMetodologiaFase: 0,
    DataAtividade: new Date(),
    Carga: '',
    DataCadastro: new Date(),
    Descricao: atividade.descricaoAtividade,
    Tags: '',
    IdCoordenador: 0,
    InicioAtividade: '',
    FimAtividade: ''
  }
  const diaCadastro = moment.utc()
  const resultado: {
    tipo: string,
    mensagem: [string],
    atividade?: AtividadeEntity
  } = {
    tipo: 'Sucesso',
    mensagem: ['Apontamento cadastrado com sucesso!']
  }

  // Validaçao de dados referente a Carga, Contrato, Colaborador e Semana
  //* Carga Superior a 24h
  //* * carga do apontamento nao pode ser superior a 24h

  if (atividade.cargaAtividade.hours() > 24) {
    resultado.mensagem.push('Carga do apontamento invalida.')
  } else {
    // Contrato Ativo
    //* é obrigatorio ter contrato ativo no dia da atividade

    const contratoAtivo = await ColaboradorContratoRepository.ContratoAtivoByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.toDate())

    if (!contratoAtivo) {
      resultado.mensagem.push('Não existe contrato ativo nesse dia.')
    } else {
      // Carga Horaria Apontamento
      //* apenas cadastrar em dias uteis ou feriados que nao sejam integrais
      //* ter permissao para horas extras
      //* se for estagiario, só pode cadastrar hora extra para 'hoje' e para o ultimo dia util
      //* hora extra nao pode exceder o maximo permitido

      const feriadoDia = await CalendarioRepository.feriadoByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.utcOffset(0, true).format())
      const cargaHorariaDia = feriadoDia
        ? (feriadoDia.HorasUteis < contratoAtivo.CargaHoraria
          ? feriadoDia.HorasUteis
          : contratoAtivo.CargaHoraria)
        : contratoAtivo.CargaHoraria

      const cargaMaximaDia = cargaHorariaDia > 0 ? cargaHorariaDia + 2 : 0

      if (atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 > cargaMaximaDia * 60) {
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
            novaAtividade.Carga = atividade.cargaAtividade.toString()
          }
        } else {
          resultado.mensagem.push('Você não tem permissão para cadastrar horas extras')
        }
      } else {
        novaAtividade.Carga = atividade.cargaAtividade.toString()
      }

      // Mes Anterior e Semana Anterior da Atividade Fechados
      //* mes anterior deve estar fechado caso o mes anterior nao seja anterior ao contrato ativo
      //* semana anterior da atividade deve estar fechada caso nao seja anterior ao contrato ativo

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

      // Semana da Atividade Aberta
      //* semana da atividade deve estar aberta

      const statusSemanaAtividade = await AtividadeFechamentoSemanaRepository.statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno(atividade.idColaborador, atividade.diaAtividade.isoWeek(), atividade.diaAtividade.month() + 1, atividade.diaAtividade.year())

      if (!statusSemanaAtividade || statusSemanaAtividade.IdAtividadeFechamentoStatus !== 1) {
        resultado.mensagem.push('Essa semana não está aberta para cadastrar novos apontamentos.')
      }
    }
  }

  if (resultado.mensagem.length > 1) {
    resultado.tipo = 'Erro'
    resultado.mensagem.shift()
    return (resultado)
  } else {
    novaAtividade.DataAtividade = atividade.diaAtividade.toDate()
    const diaCadastroDate = diaCadastro.toDate()
    diaCadastroDate.setUTCHours(diaCadastroDate.getHours())
    novaAtividade.DataCadastro = diaCadastroDate
  }

  // Validaçao de dados referente a Projeto, Fase, Categoria e Coordenador
  const idProjeto = atividade.idProjeto <= 0 ? atividade.idProjetoDefault : atividade.idProjeto
  const projeto = await ProjetoRepository.projetoById(idProjeto)

  if (!projeto) {
    resultado.mensagem.push('Projeto não encontrado')
  } else {
    novaAtividade.IdProjeto = idProjeto

    if (atividade.idProjeto <= 0) {
      const coordenador = await ColaboradorRepository.colaboradorById(atividade.idCoordenador)
      if (coordenador) {
        novaAtividade.IdCoordenador = atividade.idCoordenador
      } else if (!coordenador) {
        resultado.mensagem.push('Selecione um coordenador')
      }
    } else {
      const listaCategoriaAtividade = await ProjetoCategoriaAtividadeRepository.ProjetoCategoriaAtividadeByIdProjeto(idProjeto)
      const categoriaAtividade = await ProjetoCategoriaAtividadeRepository.projetoCategoriaAtividadeById(atividade.idCategoriaAtividade)
      if (listaCategoriaAtividade.length > 0 && categoriaAtividade) {
        novaAtividade.IdProjetoCategoriaAtividade = atividade.idCategoriaAtividade
      } else if (listaCategoriaAtividade.length > 0 && !categoriaAtividade) {
        resultado.mensagem.push('Selecione uma categoria para o apontamento')
      }

      const listaProjetoFase = await ProjetoMetodologiaFaseRepository.ProjetoFaseByIdProjeto(idProjeto)
      const projetoFase = await ProjetoMetodologiaFaseRepository.projetoFaseById(atividade.idProjetoFase)

      if (listaProjetoFase.length > 0 && projetoFase) {
        novaAtividade.IdProjetoMetodologiaFase = atividade.idProjetoFase
      } else if (listaProjetoFase.length > 0 && !projetoFase) {
        resultado.mensagem.push('Selecione uma fase para o apontamento')
      }
    }
  }

  if (resultado.mensagem.length > 1) {
    resultado.tipo = 'Erro'
    resultado.mensagem.shift()
    return (resultado)
  }

  if (resultado.mensagem.length > 1) {
    resultado.tipo = 'Erro'
    resultado.mensagem.shift()
    return (resultado)
  } else {
    const atividadeResult = await AtividadeRepository.salvarAtividade(novaAtividade)
    console.log(atividadeResult)
    resultado.atividade = novaAtividade
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
