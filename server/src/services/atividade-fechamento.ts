/* eslint-disable no-unused-vars */
import { AtividadeFechamentoRepository as Repo, AtividadeFechamentoSemanaRepository, ProjetoRepository } from '@repositories'
import { Moment } from 'moment'

const fecharSemana = async (idColaborador: number, inicioSemana: Moment) => {
  const atividadeSemanaFechamento = await AtividadeFechamentoSemanaRepository.atividadeFechamentoSemanaByIdColaboradorSemanaMesAno(idColaborador, inicioSemana.isoWeek(), inicioSemana.month(), inicioSemana.year())

  const listaProjetosAlocadosSemana = await ProjetoRepository.projetosByIdColaboradorSemana(idColaborador, inicioSemana)
  const listaProjetoDefaultCadastradoSemana = await ProjetoRepository.projetoDefaultCadastradoSemana(idColaborador, inicioSemana)

  const idsProjetosSemana = listaProjetoDefaultCadastradoSemana.map(x => x.IdProjeto).concat(listaProjetosAlocadosSemana.map(x => x.IdProjeto))
  console.log({ listaProjetoDefaultCadastradoSemana, listaProjetosAlocadosSemana, idsProjetosSemana })

  return null
}

export default {
  fecharSemana
}
