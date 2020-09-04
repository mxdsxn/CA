/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import moment from 'moment'
import libUtc from '@libUtc'
import { AtividadeModel } from '@models'
import { AtividadeEntity } from '@entities'

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
  console.log( moment(diaReferencia).utcOffset(0, true).format())
  return await dbConnection('pessoas.Atividade')
    .innerJoin('operacoes.Projeto', 'operacoes.Projeto.IdProjeto', 'pessoas.Atividade.IdProjeto')
    .fullOuterJoin('operacoes.ProjetoCategoriaAtividade', 'operacoes.ProjetoCategoriaAtividade.IdProjetoCategoriaAtividade', 'pessoas.Atividade.IdProjetoCategoriaAtividade')
    .fullOuterJoin('operacoes.ProjetoMetodologiaFase', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase', 'pessoas.Atividade.IdProjetoMetodologiaFase')
    .where('pessoas.Atividade.IdColaborador', idColaborador)
    .andWhere('pessoas.Atividade.DataAtividade', libUtc.getDate(diaReferencia))
    .select(
      'pessoas.Atividade.*',
      'operacoes.Projeto.Nome as NomeProjeto',
      'operacoes.ProjetoCategoriaAtividade.Descricao as Categoria',
      'operacoes.ProjetoMetodologiaFase.Fase'
    )
    .orderBy('pessoas.Atividade.DataAtividade', 'asc')
}

const salvarAtividade = async (atividade: AtividadeEntity): Promise<AtividadeEntity> => {
  return await dbConnection('pessoas.Atividade')
    .insert({
      IdColaborador: atividade.IdColaborador,
      IdProjeto: atividade.IdProjeto,
      IdProjetoCategoriaAtividade: atividade.IdProjetoCategoriaAtividade || null,
      IdProjetoMetodologiaFase: atividade.IdProjetoMetodologiaFase || null,
      DataCadastro: atividade.DataCadastro,
      DataAtividade: atividade.DataAtividade,
      Carga: atividade.Carga,
      Descricao: atividade.Descricao,
      Tags: atividade.Tags || null,
      IdCoordenador: atividade.IdCoordenador || null,
      InicioAtividade: atividade.InicioAtividade || null,
      FimAtividade: atividade.FimAtividade || null
    })
}

export default {
  AtividadesByIdColaboradorDia,
  AtividadesByIdColaboradorMes,
  salvarAtividade
}
