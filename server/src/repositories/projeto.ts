/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'

/* retorna lista de projetos que o colaborador esta alocado naquele dia */
const ProjetosByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const diaReferenciaInicio = diaReferencia
  const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

  return await dbConnection('operacoes.Projeto')
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
}

/* retorna lista de projetos default */
const ProjetosDefault = async (diaReferencia: Date) => {
  return await dbConnection('operacoes.Projeto')
    .innerJoin('operacoes.ProjetoTipo', 'operacoes.ProjetoTIpo.IdProjetoTipo', 'operacoes.Projeto.IdProjetoTipo')
    .where('operacoes.ProjetoTipo.Descricao', 'Default')
    .andWhere('DataInicial', '<=', diaReferencia)
    .andWhere(function () {
      this.where('DataFinalAceite', '>=', diaReferencia)
        .orWhere('DataFinalAceite', null)
    })
    .select(
      'operacoes.Projeto.IdProjeto',
      'operacoes.ProjetoTipo.IdProjetoTipo',
      'operacoes.Projeto.Nome',
      'operacoes.ProjetoTipo.Descricao as ProjetoTipo'
    )
    .orderBy('operacoes.Projeto.Nome', 'asc')
}

export default {
  ProjetosByIdColaboradorDia,
  ProjetosDefault
}