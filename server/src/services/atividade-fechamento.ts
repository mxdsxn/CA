/* eslint-disable no-unused-vars */

import { AtividadeFechamentoEntity } from '@entities'
import { AtividadeFechamentoRepository as Repo, AtividadeRepository, AtividadeFechamentoSemanaRepository, ProjetoRepository } from '@repositories'
import { Moment } from 'moment'

const fecharSemana = async (idColaborador: number, diaFechamento: Moment) => {
  const atividadeFechamentoSemana = await AtividadeFechamentoSemanaRepository.atividadeFechamentoSemanaByIdColaboradorSemanaMesAno(idColaborador, diaFechamento.isoWeek(), diaFechamento.month() + 1, diaFechamento.year())

  const listaProjetosAlocadosSemana = await ProjetoRepository.projetosByIdColaboradorSemana(idColaborador, diaFechamento)
  const listaProjetoDefaultCadastradoSemana = await ProjetoRepository.projetoDefaultCadastradoSemana(idColaborador, diaFechamento)

  const idsProjetosSemana = listaProjetoDefaultCadastradoSemana.map(x => x.IdProjeto).concat(listaProjetosAlocadosSemana.map(x => x.IdProjeto))

  const listaAtividadeFechamento: AtividadeFechamentoEntity[] = []

  const atividadesSemanaByProjeto = await AtividadeRepository.atividadesByIdColaboradorSemana(idColaborador, diaFechamento)

  if (idsProjetosSemana.length > 0) {
    idsProjetosSemana.forEach(async idProjeto => {
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

  return null
}

export default {
  fecharSemana
}
