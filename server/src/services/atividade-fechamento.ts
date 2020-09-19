/* eslint-disable no-unused-vars */

import { AtividadeFechamentoEntity } from '@entities'
import { AtividadeFechamentoRepository as Repo, AtividadeRepository, AtividadeFechamentoSemanaRepository, ProjetoRepository } from '@repositories'
import moment, { Moment } from 'moment'

const fecharSemana = async (idColaborador: number, diaSemana: Moment) => {
  const diaFechamento = moment().utcOffset(0, true)

  const atividadeFechamentoSemana = await AtividadeFechamentoSemanaRepository.atividadeFechamentoSemanaByIdColaboradorSemanaMesAno(idColaborador, diaSemana.isoWeek(), diaSemana.month() + 1, diaSemana.year()) || {
    IdAtividadeFechamentoSemana: 0,
    IdAtividadeFechamentoStatus: 1,
    IdColaborador: idColaborador,
    Semana: diaSemana.isoWeek(),
    Mes: diaSemana.month() + 1,
    Ano: diaSemana.year()
  }

  if (atividadeFechamentoSemana.IdAtividadeFechamentoStatus === 1) {
    const listaProjetosAlocadosSemana = await ProjetoRepository.projetosByIdColaboradorSemana(idColaborador, diaSemana)
    const listaProjetoDefaultCadastradoSemana = await ProjetoRepository.projetoDefaultCadastradoSemana(idColaborador, diaSemana)

    const listaIdProjetosSemana = listaProjetoDefaultCadastradoSemana.map(x => x.IdProjeto).concat(listaProjetosAlocadosSemana.map(x => x.IdProjeto))

    const listaAtividadeFechamento: AtividadeFechamentoEntity[] = []

    const atividadesSemanaByProjeto = await AtividadeRepository.atividadesByIdColaboradorSemana(idColaborador, diaSemana)

    if (listaIdProjetosSemana.length > 0) {
      listaIdProjetosSemana.map(async idProjeto => {
        // status da semana: 2 - fechada | 6 - aprovada automaticamente caso nao haja atividade daquele projeto na semana
        const idAtividadeFechamentoStatus = atividadesSemanaByProjeto.map(x => x.IdProjeto === idProjeto).length > 0 ? 2 : 6

        const result: AtividadeFechamentoEntity = {
          IdAtividadeFechamento: 0,
          Ano: diaSemana.year(),
          Semana: diaSemana.isoWeek(),
          Mes: diaSemana.month() + 1,
          IdColaborador: idColaborador,
          IdProjeto: idProjeto,
          DataFechamento: diaFechamento,
          IdAtividadeFechamentoStatus: idAtividadeFechamentoStatus
        }

        listaAtividadeFechamento.push(result)
      })
    } else {
      // se nao houver atividade na semana, aprovar semana
      const result: AtividadeFechamentoEntity = {
        IdAtividadeFechamento: 0,
        Ano: diaSemana.year(),
        Semana: diaSemana.isoWeek(),
        Mes: diaSemana.month() + 1,
        IdColaborador: idColaborador,
        DataFechamento: diaFechamento,
        IdAtividadeFechamentoStatus: 3
      }

      listaAtividadeFechamento.push(result)
    }

    const aprovadasAutomatico = listaAtividadeFechamento.filter(x => x.IdAtividadeFechamentoStatus === 6).length
    const abertas = listaAtividadeFechamento.filter(x => x.IdAtividadeFechamentoStatus === 1).length
    const fechadas = listaAtividadeFechamento.filter(x => x.IdAtividadeFechamentoStatus === 2).length
    const aprovadas = listaAtividadeFechamento.filter(x => x.IdAtividadeFechamentoStatus === 3).length
    const totalProjetos = listaIdProjetosSemana.length
    let idAtividadeStatusSemana = 1

    if (totalProjetos === aprovadasAutomatico) {
      idAtividadeStatusSemana = 3
    } else {
      if (abertas === totalProjetos) {
        idAtividadeStatusSemana = 1
      } else {
        if (fechadas + aprovadasAutomatico === totalProjetos) {
          idAtividadeStatusSemana = 2
        } else {
          if (aprovadas + aprovadasAutomatico === totalProjetos) {
            idAtividadeStatusSemana = 3
          } else {
            if (abertas > 0) {
              idAtividadeStatusSemana = 4
            } else {
              if (fechadas > 0) {
                idAtividadeStatusSemana = 5
              }
            }
          }
        }
      }
    }

    atividadeFechamentoSemana.IdAtividadeFechamentoStatus = idAtividadeStatusSemana

    // const resultListaAtividadeFechamento = listaAtividadeFechamento.map(atividadeFechamento => {
    //   Repo.salvarAtividadeFechamento(atividadeFechamento)
    // })

    // if (atividadeFechamentoSemana.IdAtividadeFechamentoSemana === 0) {
    //   const resultAtividadeFechamentoSemana = AtividadeFechamentoSemanaRepository.salvarAtividadeFechamentoSemana(atividadeFechamentoSemana)
    // } else {
    //   const resultAtividadeFechamentoSemana = AtividadeFechamentoSemanaRepository.atualizarAtividadeFechamentoSemana(atividadeFechamentoSemana)
    // }
  }

  return null
}

export default {
  fecharSemana
}
