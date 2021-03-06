/* eslint-disable no-unused-expressions */
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

import {
  AtividadeRepository as Repo,
  ColaboradorContratoRepository,
  AtividadeFechamentoSemanaRepository,
  PermissaoHoraExtraRepository,
  CalendarioRepository,
  ProjetoRepository,
  ProjetoCategoriaAtividadeRepository,
  ProjetoMetodologiaFaseRepository,
  ColaboradorRepository
} from '@repositories'
import { DiaModel, AtividadeModel } from '@models'

const atividadeById = async (idColaborador: number, idAtividade: number) => {
  return await Repo.atividadeById(idColaborador, idAtividade)
}

/* retorna lista de atividades do colaborador em um mes */
const atividadesByIdColaboradorMes = async (idColaborador: number, mesReferencia: Moment, naoAgruparDia?: boolean) => {
  const listaAtividadeMes = await Repo.atividadesByIdColaboradorMes(idColaborador, mesReferencia)

  if (!naoAgruparDia && listaAtividadeMes.length > 0) {
    const listaFeriadosFds = await CalendarioService.ListaFeriadoFinalSemanaByMes(idColaborador, mesReferencia)
    const listaContratosMes = await ColaboradorContratoService.contratosByIdColaborador(idColaborador, mesReferencia)
    return await agruparAtividadesDia(mesReferencia, listaAtividadeMes, listaFeriadosFds, listaContratosMes, idColaborador)
  }

  return listaAtividadeMes
}

const atividadesByIdColaboradorDia = async (idColaborador: number, diaReferencia: Moment, naoAgruparDia?: boolean) => {
  const listaAtividadeDia = await Repo.atividadesByIdColaboradorDia(idColaborador, diaReferencia)

  return listaAtividadeDia
}

const salvarAtividade = async (
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
  const diaCadastro = moment().utcOffset(0, true)
  const resultado: {
    tipo: string,
    mensagem: [string],
    atividade?: AtividadeEntity
  } = {
    tipo: 'Sucesso',
    mensagem: ['Atividade cadastrada com sucesso!']
  }

  // Validaçao de dados referente a Carga, Contrato, Colaborador e Semana
  //* Carga Superior a 24h
  //* * carga da atividade nao pode ser superior a 24h

  if (atividade.cargaAtividade.hours() > 24) {
    resultado.mensagem.push('Carga da atividade invalida.')
  } else {
    // Contrato Ativo
    //* é obrigatorio ter contrato ativo no dia da atividade

    const contratoAtivo = await ColaboradorContratoRepository.contratoAtivoByIdColaborador(atividade.idColaborador, atividade.diaAtividade)

    if (!contratoAtivo) {
      resultado.mensagem.push('Não existe contrato ativo nesse dia.')
    } else {
      // Carga Horaria atividade
      //* apenas cadastrar em dias uteis ou feriados que nao sejam integrais
      //* ter permissao para horas extras
      //* se for estagiario, só pode cadastrar hora extra para 'hoje' e para o ultimo dia util
      //* hora extra nao pode exceder o maximo permitido

      const feriadoDia = await CalendarioRepository.feriadoByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.utcOffset(0, true).format())
      const horasCadastradasDia = await horasCadastradasByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.utcOffset(0, true))

      const cargaHorariaDia = feriadoDia
        ? (feriadoDia.HorasUteis < contratoAtivo.CargaHoraria
          ? feriadoDia.HorasUteis
          : contratoAtivo.CargaHoraria)
        : contratoAtivo.CargaHoraria

      const cargaMaximaDia = cargaHorariaDia > 0 ? cargaHorariaDia + 2 : 0
      const cargaHorasRestantes = cargaMaximaDia - horasCadastradasDia

      if (atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 + horasCadastradasDia * 60 > cargaHorariaDia * 60 &&
        atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 + horasCadastradasDia * 60 <= cargaMaximaDia * 60) {
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
            resultado.mensagem.push('Estagiarios só podem cadastrar horas extras para Hoje ou para o último dia util.')
          } else {
            novaAtividade.Carga = atividade.cargaAtividade.format('HH:mm')
          }
        } else {
          resultado.mensagem.push('Você não tem permissão para cadastrar horas extras.')
        }
      } else if (atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 + horasCadastradasDia * 60 > cargaMaximaDia * 60) {
        resultado.mensagem.push('Essa carga ultrapassa o máximo permitido.')
      } else if (cargaHorasRestantes < 0) {
        resultado.mensagem.push('Você já cadastrou todas as horas para esse dia')
      } else {
        novaAtividade.Carga = atividade.cargaAtividade.format('HH:mm')
      }

      // Mes Anterior e Semana Anterior da Atividade Fechados
      //* mes anterior deve estar fechado caso o mes anterior nao seja anterior ao contrato ativo
      //* semana anterior da atividade deve estar fechada caso nao seja anterior ao contrato ativo

      if (atividade.diaAtividade.isAfter(moment(contratoAtivo.DataInicioContrato).startOf('month').add(1, 'month'))) {
        const mesAnterior = moment(atividade.diaAtividade).subtract(1, 'month')
        const atividadeFechamentoSemanaListaMes = await AtividadeFechamentoSemanaRepository.listaAtividadeFechamentoSemanaByIdColaboradorMesAno(atividade.idColaborador, mesAnterior.month() + 1, mesAnterior.year())

        const mesAnteriorAberto = atividadeFechamentoSemanaListaMes.find(x => x.IdAtividadeFechamentoStatus === 1)
        if (mesAnteriorAberto) {
          resultado.mensagem.push(`Há uma ou mais semanas abertas no mes de ${mesAnterior.locale('pt-br').format('MMMM').toUpperCase()}.`)
        }
      }

      if (atividade.diaAtividade.isAfter(moment(contratoAtivo.DataInicioContrato).startOf('day').add(1, 'week'))) {
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
        resultado.mensagem.push('Essa semana não está aberta para cadastrar novas atividades.')
      }
    }
  }

  if (resultado.mensagem.length > 1) {
    resultado.tipo = 'Erro'
    resultado.mensagem.shift()
    return (resultado)
  } else {
    novaAtividade.DataAtividade = atividade.diaAtividade.utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate()
    novaAtividade.DataCadastro = diaCadastro.toDate()
  }

  // Validaçao de dados referente a Projeto, Fase, Categoria e Coordenador
  const idProjeto = atividade.idProjeto <= 0 ? atividade.idProjetoDefault : atividade.idProjeto
  const projeto = await ProjetoRepository.projetoById(idProjeto)

  if (!projeto) {
    resultado.mensagem.push('Projeto não encontrado.')
  } else {
    novaAtividade.IdProjeto = idProjeto

    if (atividade.idProjeto <= 0) {
      const coordenador = await ColaboradorRepository.colaboradorById(atividade.idCoordenador)
      if (coordenador) {
        novaAtividade.IdCoordenador = atividade.idCoordenador
      } else if (!coordenador) {
        resultado.mensagem.push('Selecione um coordenador.')
      }
    } else {
      const listaCategoriaAtividade = await ProjetoCategoriaAtividadeRepository.projetoCategoriaAtividadeByIdProjeto(idProjeto)
      const categoriaAtividade = await ProjetoCategoriaAtividadeRepository.projetoCategoriaAtividadeById(atividade.idCategoriaAtividade)
      if (listaCategoriaAtividade.length > 0 && categoriaAtividade) {
        novaAtividade.IdProjetoCategoriaAtividade = atividade.idCategoriaAtividade
      } else if (listaCategoriaAtividade.length > 0 && !categoriaAtividade) {
        resultado.mensagem.push('Selecione uma categoria para a atividade.')
      }

      const listaProjetoFase = await ProjetoMetodologiaFaseRepository.projetoFaseByIdProjeto(idProjeto)
      const projetoFase = await ProjetoMetodologiaFaseRepository.projetoFaseById(atividade.idProjetoFase)

      if (listaProjetoFase.length > 0 && projetoFase) {
        novaAtividade.IdProjetoMetodologiaFase = atividade.idProjetoFase
      } else if (listaProjetoFase.length > 0 && !projetoFase) {
        resultado.mensagem.push('Selecione uma fase para a atividade.')
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
    const atividadeResult = await Repo.salvarAtividade(novaAtividade)
    return (resultado)
  }
}

const editarAtividade = async (
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
  const novaAtividade: AtividadeEntity = {
    IdAtividade: atividade.idAtividade,
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
  const velhaAtividade = await Repo.atividadeById(atividade.idColaborador, atividade.idAtividade)
  const cargaVelhaAtividadeMinutos = velhaAtividade.Carga.split(':').map(x => Number(x))

  const diaCadastro = moment().utcOffset(0, true)
  const resultado: {
    tipo: string,
    mensagem: [string],
    atividade?: AtividadeEntity
  } = {
    tipo: 'Sucesso',
    mensagem: ['Atividade atualizada com sucesso!']
  }

  // Validaçao de dados referente a Carga, Contrato, Colaborador e Semana
  //* Carga Superior a 24h
  //* * carga da atividade nao pode ser superior a 24h

  if (atividade.cargaAtividade.hours() > 24) {
    resultado.mensagem.push('Carga da atividade invalida.')
  } else {
    // Contrato Ativo
    //* é obrigatorio ter contrato ativo no dia da atividade

    const contratoAtivo = await ColaboradorContratoRepository.contratoAtivoByIdColaborador(atividade.idColaborador, atividade.diaAtividade)

    if (!contratoAtivo) {
      resultado.mensagem.push('Não existe contrato ativo nesse dia.')
    } else {
      // Carga Horaria atividade
      //* apenas cadastrar em dias uteis ou feriados que nao sejam integrais
      //* ter permissao para horas extras
      //* se for estagiario, só pode cadastrar hora extra para 'hoje' e para o ultimo dia util
      //* hora extra nao pode exceder o maximo permitido

      const feriadoDia = await CalendarioRepository.feriadoByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.utcOffset(0, true).format())
      const horasCadastradasDia = await horasCadastradasByIdColaboradorDia(atividade.idColaborador, atividade.diaAtividade.utcOffset(0, true)) - cargaVelhaAtividadeMinutos[0] - (cargaVelhaAtividadeMinutos[1] / 60)

      const cargaHorariaDia = feriadoDia
        ? (feriadoDia.HorasUteis < contratoAtivo.CargaHoraria
          ? feriadoDia.HorasUteis
          : contratoAtivo.CargaHoraria)
        : contratoAtivo.CargaHoraria

      const cargaMaximaDia = cargaHorariaDia > 0 ? cargaHorariaDia + 2 : 0
      const cargaHorasRestantes = cargaMaximaDia - horasCadastradasDia

      if (atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 + horasCadastradasDia * 60 > cargaHorariaDia * 60 &&
        atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 + horasCadastradasDia * 60 <= cargaMaximaDia * 60) {
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
            resultado.mensagem.push('Estagiarios só podem cadastrar horas extras para Hoje ou para o último dia util.')
          } else {
            novaAtividade.Carga = atividade.cargaAtividade.format('HH:mm')
          }
        } else {
          resultado.mensagem.push('Você não tem permissão para cadastrar horas extras.')
        }
      } else if (atividade.cargaAtividade.minute() + atividade.cargaAtividade.hour() * 60 + horasCadastradasDia * 60 > cargaMaximaDia * 60) {
        resultado.mensagem.push('Essa carga ultrapassa o máximo permitido.')
      } else if (cargaHorasRestantes < 0) {
        resultado.mensagem.push('Você já cadastrou todas as horas para esse dia')
      } else {
        novaAtividade.Carga = atividade.cargaAtividade.format('HH:mm')
      }

      // Mes Anterior e Semana Anterior da Atividade Fechados
      //* mes anterior deve estar fechado caso o mes anterior nao seja anterior ao contrato ativo
      //* semana anterior da atividade deve estar fechada caso nao seja anterior ao contrato ativo

      if (atividade.diaAtividade.isAfter(moment(contratoAtivo.DataInicioContrato).startOf('month').add(1, 'month'))) {
        const mesAnterior = moment(atividade.diaAtividade).subtract(1, 'month')
        const atividadeFechamentoSemanaListaMes = await AtividadeFechamentoSemanaRepository.listaAtividadeFechamentoSemanaByIdColaboradorMesAno(atividade.idColaborador, mesAnterior.month() + 1, mesAnterior.year())

        const mesAnteriorAberto = atividadeFechamentoSemanaListaMes.find(x => x.IdAtividadeFechamentoStatus === 1)
        if (mesAnteriorAberto) {
          resultado.mensagem.push(`Há uma ou mais semanas abertas no mes de ${mesAnterior.locale('pt-br').format('MMMM').toUpperCase()}.`)
        }
      }

      if (atividade.diaAtividade.isAfter(moment(contratoAtivo.DataInicioContrato).startOf('day').add(1, 'week'))) {
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
        resultado.mensagem.push('Essa semana não está aberta para cadastrar novas atividades.')
      }
    }
  }

  if (resultado.mensagem.length > 1) {
    resultado.tipo = 'Erro'
    resultado.mensagem.shift()
    return (resultado)
  } else {
    novaAtividade.DataAtividade = atividade.diaAtividade.utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate()
    novaAtividade.DataCadastro = diaCadastro.toDate()
  }

  // Validaçao de dados referente a Projeto, Fase, Categoria e Coordenador
  const idProjeto = atividade.idProjeto <= 0 ? atividade.idProjetoDefault : atividade.idProjeto
  const projeto = await ProjetoRepository.projetoById(idProjeto)

  if (!projeto) {
    resultado.mensagem.push('Projeto não encontrado.')
  } else {
    novaAtividade.IdProjeto = idProjeto

    if (atividade.idProjeto <= 0) {
      const coordenador = await ColaboradorRepository.colaboradorById(atividade.idCoordenador)
      if (coordenador) {
        novaAtividade.IdCoordenador = atividade.idCoordenador
      } else if (!coordenador) {
        resultado.mensagem.push('Selecione um coordenador.')
      }
    } else {
      const listaCategoriaAtividade = await ProjetoCategoriaAtividadeRepository.projetoCategoriaAtividadeByIdProjeto(idProjeto)
      const categoriaAtividade = await ProjetoCategoriaAtividadeRepository.projetoCategoriaAtividadeById(atividade.idCategoriaAtividade)
      if (listaCategoriaAtividade.length > 0 && categoriaAtividade) {
        novaAtividade.IdProjetoCategoriaAtividade = atividade.idCategoriaAtividade
      } else if (listaCategoriaAtividade.length > 0 && !categoriaAtividade) {
        resultado.mensagem.push('Selecione uma categoria para a atividade.')
      }

      const listaProjetoFase = await ProjetoMetodologiaFaseRepository.projetoFaseByIdProjeto(idProjeto)
      const projetoFase = await ProjetoMetodologiaFaseRepository.projetoFaseById(atividade.idProjetoFase)

      if (listaProjetoFase.length > 0 && projetoFase) {
        novaAtividade.IdProjetoMetodologiaFase = atividade.idProjetoFase
      } else if (listaProjetoFase.length > 0 && !projetoFase) {
        resultado.mensagem.push('Selecione uma fase para a atividade.')
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
    const atividadeResult = await Repo.atualizarAtividade(novaAtividade)
    return (resultado)
  }
}

const deletaAtividade = async (idAtividade: number) => {
  return await Repo.deletaAtividade(idAtividade)
}

const agruparAtividadesDia = async (mesReferencia: Moment, listaAtividade: AtividadeEntity[], listaFeriadosFds: DiaModel[], listaContratos: ColaboradorContratoEntity[], idColaborador: number): DiaModel[] => {
  const contrato = listaContratos[0]

  const inicioMes = mesReferencia.month() === moment(contrato.DataInicioContrato).utcOffset(0, false).month() &&
    mesReferencia.year() === moment(contrato.DataInicioContrato).year()
    ? moment(contrato.DataInicioContrato).utcOffset(0, false).startOf('day')
    : mesReferencia

  const fimMes = moment(inicioMes).utcOffset(0, false).endOf('month').isSame(moment().utcOffset(0, true).endOf('month'))
    ? moment().utcOffset(0, true).endOf('month')
    : moment(inicioMes).utcOffset(0, true).endOf('month')

  const listaAtividadePorDia: DiaModel[] = []

  for (let dia = inicioMes; dia.isSameOrBefore(fimMes); dia = moment(dia).add(1, 'day')) {
    const atividadesDia = listaAtividade.filter(x => moment(x.DataAtividade).isSame(dia))
    const descricao = listaFeriadosFds.find(x => x.Dia.isSame(dia))?.Descricao || null
    const statusSemana = await AtividadeFechamentoSemanaRepository.statusAtividadeFechamentoSemanaByIdColaboradorSemanaMesAno(idColaborador, dia.isoWeek(), dia.month() + 1, dia.year())

    const result: DiaModel = {
      Dia: dia,
      Descricao: descricao,
      Atividades: atividadesDia,
      Aberto: statusSemana.IdAtividadeFechamentoStatus === 1 || false
    }

    listaAtividadePorDia.push(result)
  }
  return listaAtividadePorDia
}

const HorasUteisMesByIdColaboradorMes = async (idColaborador: number, mesReferencia: Moment) => {
  const inicioMes = moment(mesReferencia).utcOffset(0, true).startOf('month')
  const finalMes = moment(inicioMes).utcOffset(0, false).endOf('month')

  const listaFeriadosMes: CalendarioEntity[] = await CalendarioService.feriadosByIdColaboradorMes(idColaborador, inicioMes) || []
  const listaContratosMes: ColaboradorContratoEntity[] = await ColaboradorContratoService.contratosByIdColaborador(idColaborador, mesReferencia)

  var horasPrevistasMes = 0

  for (let dia = inicioMes; dia.isSameOrBefore(finalMes); dia = moment(dia).add(1, 'day')) {
    if (dia.weekday() !== 6 && dia.weekday() !== 0) { // se diferente de sabado e domingo
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

const HorasUteisAteHojeByIdColaboradorMes = async (idColaborador: number, mesReferencia: Moment) => {
  const inicioMes = moment(mesReferencia).utcOffset(0, true).startOf('month')
  const diaFinal = inicioMes.isSame(moment().utcOffset(0, true).startOf('month'))
    ? moment().utcOffset(0, false).endOf('day')
    : moment(inicioMes).utcOffset(0, false).endOf('month')

  const listaFeriadosMes: CalendarioEntity[] = await CalendarioService.feriadosByIdColaboradorMes(idColaborador, inicioMes) || []
  const listaContratosMes: ColaboradorContratoEntity[] = await ColaboradorContratoService.contratosByIdColaborador(idColaborador, mesReferencia)

  var horasPrevistaAteHoje = 0
  for (let dia = inicioMes; dia.isSameOrBefore(diaFinal); dia = moment(dia).add(1, 'day')) {
    if (dia.weekday() !== 6 && dia.weekday() !== 0) { // se diferente de sabado e domingo
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

const HorasCadastradasByIdColaboradorMes = async (idColaborador: number, mesReferencia: Moment) => {
  const listaAtividadesMes = await atividadesByIdColaboradorMes(idColaborador, mesReferencia, true)

  return HorasDecimal(listaAtividadesMes as AtividadeModel[])
}

const horasCadastradasByIdColaboradorDia = async (idColaborador: number, diaReferencia: Moment) => {
  const listaAtividadesMes = await atividadesByIdColaboradorDia(idColaborador, diaReferencia)

  return HorasDecimal(listaAtividadesMes as AtividadeModel[])
}

const horasMesByIdColaborador = async (idColaborador: number, mesReferencia: Moment) => {
  const horasUteisMes = await HorasUteisMesByIdColaboradorMes(idColaborador, mesReferencia)
  const horasUteisHoje = await HorasUteisAteHojeByIdColaboradorMes(idColaborador, mesReferencia)
  const horasCadastradasAteHoje = await HorasCadastradasByIdColaboradorMes(idColaborador, mesReferencia)

  return { horasUteisMes, horasUteisHoje, horasCadastradasAteHoje }
}

const CargaHorariaFeriado = (listaFeriado: CalendarioEntity[], diaReferencia: Moment) => {
  const result = listaFeriado.find(feriado => diaReferencia.isSame(feriado.Dia))?.HorasUteis

  return (result !== undefined ? result : 8) as number
}

const CargaHorariaDia = (listaContrato: ColaboradorContratoEntity[], diaReferencia: Moment) => {
  const result = listaContrato.find(contrato => diaReferencia.isSameOrAfter(contrato.DataInicioContrato) &&
    (diaReferencia.isSameOrBefore(contrato.Termino) || contrato.Termino === null))?.CargaHoraria

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
  atividadeById,
  salvarAtividade,
  editarAtividade,
  deletaAtividade,
  atividadesByIdColaboradorMes,
  atividadesByIdColaboradorDia,
  horasMesByIdColaborador
}
