/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { ProjetoModel } from '@models'
import { ProjetoEntity } from '@entities'

/* retorna lista de projetos que o colaborador esta alocado naquele dia */
const projetosByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date): Promise<ProjetoModel[]> => {
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
const projetosDefault = async (diaReferencia: Date): Promise<ProjetoModel[]> => {
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

const projetoById = (idProjeto: number): Promise<ProjetoEntity> => {
  return dbConnection('operacoes.Projeto')
    .where({ IdProjeto: idProjeto })
    .first()
}

export default {
  projetoById,
  projetosByIdColaboradorDia,
  projetosDefault
}
