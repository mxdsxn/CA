/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { AtividadeModel } from '@models'

const AtividadesByIdColaboradorMes = async (idColaborador: number, mesReferencia: Date): Promise<AtividadeModel[]> => {
  const mesReferenciaInicio = mesReferencia
  const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

  return await dbConnection('pessoas.Atividade')
    .innerJoin('operacoes.Projeto', 'operacoes.Projeto.IdProjeto', 'pessoas.Atividade.IdProjeto')
    .fullOuterJoin('operacoes.ProjetoCategoriaAtividade', 'operacoes.ProjetoCategoriaAtividade.IdProjetoCategoriaAtividade', 'pessoas.Atividade.IdProjetoCategoriaAtividade')
    .fullOuterJoin('operacoes.ProjetoMetodologiaFase', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase', 'pessoas.Atividade.IdProjetoMetodologiaFase')
    .where('pessoas.Atividade.IdColaborador', idColaborador)
    .andWhere('pessoas.Atividade.DataAtividade', '>=', mesReferenciaInicio)
    .andWhere('pessoas.Atividade.DataAtividade', '<', mesReferenciaFim)
    .select(
      'pessoas.Atividade.*',
      'operacoes.Projeto.Nome as NomeProjeto',
      'operacoes.ProjetoCategoriaAtividade.Descricao as Categoria',
      'operacoes.ProjetoMetodologiaFase.Fase'
    )
    .orderBy('pessoas.Atividade.DataAtividade', 'asc')
}

const AtividadesByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date): Promise<AtividadeModel[]> => {
  return await dbConnection('pessoas.Atividade')
    .innerJoin('operacoes.Projeto', 'operacoes.Projeto.IdProjeto', 'pessoas.Atividade.IdProjeto')
    .fullOuterJoin('operacoes.ProjetoCategoriaAtividade', 'operacoes.ProjetoCategoriaAtividade.IdProjetoCategoriaAtividade', 'pessoas.Atividade.IdProjetoCategoriaAtividade')
    .fullOuterJoin('operacoes.ProjetoMetodologiaFase', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase', 'pessoas.Atividade.IdProjetoMetodologiaFase')
    .where('pessoas.Atividade.IdColaborador', idColaborador)
    .andWhere('pessoas.Atividade.DataAtividade', diaReferencia)
    .select(
      'pessoas.Atividade.*',
      'operacoes.Projeto.Nome as NomeProjeto',
      'operacoes.ProjetoCategoriaAtividade.Descricao as Categoria',
      'operacoes.ProjetoMetodologiaFase.Fase'
    )
    .orderBy('pessoas.Atividade.DataAtividade', 'asc')
}

export default {
  AtividadesByIdColaboradorDia,
  AtividadesByIdColaboradorMes
}
