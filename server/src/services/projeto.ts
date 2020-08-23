/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjeto, IProjetoAlocacao, IProjetoAlocacaoPeriodo, IProjetoTipo } from '@models'
import libUtc from '@libUtc'

/* retorna lista de projetos que o colaborador esta alocado naquele dia */
const ProjetosByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const diaReferenciaInicio = diaReferencia
  const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

  const listaProjeto = await dbConnection('operacoes.Projeto')
    .innerJoin('operacoes.ProjetoAlocacao', 'operacoes.ProjetoAlocacao.IdProjeto', 'operacoes.Projeto.IdProjeto')
    .innerJoin('operacoes.ProjetoAlocacaoPeriodo', 'operacoes.ProjetoAlocacaoPeriodo.IdProjetoAlocacao', 'operacoes.ProjetoAlocacao.IdProjetoAlocacao')
    .innerJoin('operacoes.ProjetoTipo', 'operacoes.ProjetoTipo.IdProjetoTipo', 'operacoes.Projeto.IdProjetoTipo')
    .where('operacoes.ProjetoAlocacao.IdColaborador', idColaborador)
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataInicio', '<=', diaReferenciaFim)
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataFim', '>=', diaReferenciaInicio)
    .select(
      'operacoes.Projeto.IdProjeto',
      'operacoes.ProjetoTipo.IdProjetoTipo',
      'operacoes.Projeto.Nome',
      'operacoes.ProjetoTipo.Descricao as ProjetoTipo'
    )
    .orderBy('operacoes.Projeto.Nome', 'asc')

  return listaProjeto
}
/* retorna lista de projetos default */
const ProjetosDefault = async (diaReferencia: Date) => {

  const listaProjetosDefault = await dbConnection('operacoes.Projeto')
    .innerJoin('operacoes.ProjetoTipo', 'operacoes.ProjetoTIpo.IdProjetoTipo', 'operacoes.Projeto.IdProjetoTipo')
    .select(
      'operacoes.Projeto.IdProjeto',
      'operacoes.ProjetoTipo.IdProjetoTipo',
      'operacoes.Projeto.Nome',
      'operacoes.ProjetoTipo.Descricao as ProjetoTipo'
    )
    .where('operacoes.ProjetoTipo.Descricao', 'Default')
    .andWhere('DataInicial', '<=', diaReferencia)
    .andWhere(function () {
      this.where('DataFinalAceite', '>=', diaReferencia)
        .orWhere('DataFinalAceite', null)
    })
    .orderBy('operacoes.Projeto.Nome', 'asc')

  return (listaProjetosDefault)
}

export default {
  ProjetosByIdColaboradorDia,
  ProjetosDefault
}
