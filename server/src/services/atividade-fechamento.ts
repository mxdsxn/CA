/* eslint-disable no-unused-vars */

import { AtividadeFechamentoEntity } from '@entities'
import { AtividadeFechamentoRepository as Repo, AtividadeRepository, AtividadeFechamentoSemanaRepository, ProjetoRepository } from '@repositories'
import { Moment } from 'moment'

const fecharSemana = async (idColaborador: number, diaFechamento: Moment) => {
  const atividadeFechamentoSemana = await AtividadeFechamentoSemanaRepository.atividadeFechamentoSemanaByIdColaboradorSemanaMesAno(idColaborador, diaFechamento.isoWeek(), diaFechamento.month() + 1, diaFechamento.year()) || {
    IdAtividadeFechamentoSemana: 0,
    IdAtividadeFechamentoStatus: 1,
    IdColaborador: idColaborador,
    Semana: diaFechamento.isoWeek(),
    Mes: diaFechamento.month() + 1,
    Ano: diaFechamento.year()
  }
  console.log(atividadeFechamentoSemana)
  if (atividadeFechamentoSemana.IdAtividadeFechamentoStatus === 1) {
    const listaProjetosAlocadosSemana = await ProjetoRepository.projetosByIdColaboradorSemana(idColaborador, diaFechamento)
    const listaProjetoDefaultCadastradoSemana = await ProjetoRepository.projetoDefaultCadastradoSemana(idColaborador, diaFechamento)

    const listaIdProjetosSemana = listaProjetoDefaultCadastradoSemana.map(x => x.IdProjeto).concat(listaProjetosAlocadosSemana.map(x => x.IdProjeto))

    const listaAtividadeFechamento: AtividadeFechamentoEntity[] = []

    const atividadesSemanaByProjeto = await AtividadeRepository.atividadesByIdColaboradorSemana(idColaborador, diaFechamento)

    if (listaIdProjetosSemana.length > 0) {
      listaIdProjetosSemana.map(async idProjeto => {
        // status da semana: 2 - fechada | 6 - aprovada automaticamente caso nao haja atividade daquele projeto na semana
        const idAtividadeFechamentoStatus = atividadesSemanaByProjeto.map(x => x.IdProjeto === idProjeto).length > 0 ? 2 : 6

        const result: AtividadeFechamentoEntity = {
          IdAtividadeFechamento: 0,
          Ano: diaFechamento.year(),
          Semana: diaFechamento.isoWeek(),
          Mes: diaFechamento.month() + 1,
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
        Ano: diaFechamento.year(),
        Semana: diaFechamento.isoWeek(),
        Mes: diaFechamento.month() + 1,
        IdColaborador: idColaborador,
        DataFechamento: diaFechamento,
        IdAtividadeFechamentoStatus: 3
      }

      listaAtividadeFechamento.push(result)
    }

    const aprovadasAutomatico = listaAtividadeFechamento.map(x => x.IdAtividadeFechamentoStatus === 6).length
    const abertas = listaAtividadeFechamento.map(x => x.IdAtividadeFechamentoStatus === 1).length
    const fechadas = listaAtividadeFechamento.map(x => x.IdAtividadeFechamentoStatus === 2).length
    const aprovadas = listaAtividadeFechamento.map(x => x.IdAtividadeFechamentoStatus === 3).length
    const totalProjetos = listaIdProjetosSemana.length
    let idAtividadeStatusSemana = 1

    if (totalProjetos === aprovadasAutomatico) {
      idAtividadeStatusSemana = 3
    } else {
      if (abertas === totalProjetos) { idAtividadeStatusSemana = 1 } else {
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

    console.log({ atividadeFechamentoSemana, listaAtividadeFechamento })
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
