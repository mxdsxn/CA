/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { ProjetoModel } from '@models'
import { ProjetoEntity } from '@entities'
import moment, { Moment } from 'moment'

/* retorna lista de projetos que o colaborador esta alocado naquele dia */
const projetosByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Moment): Promise<ProjetoModel[]> => {
  const diaReferenciaInicio = moment(diaReferencia).utcOffset(0, true).startOf('day')
  const diaReferenciaFim = moment(diaReferencia).utcOffset(0, true).endOf('day')

  return await dbConnection('operacoes.Projeto')
    .innerJoin('operacoes.ProjetoAlocacao', 'operacoes.ProjetoAlocacao.IdProjeto', 'operacoes.Projeto.IdProjeto')
    .innerJoin('operacoes.ProjetoAlocacaoPeriodo', 'operacoes.ProjetoAlocacaoPeriodo.IdProjetoAlocacao', 'operacoes.ProjetoAlocacao.IdProjetoAlocacao')
    .innerJoin('operacoes.ProjetoTipo', 'operacoes.ProjetoTipo.IdProjetoTipo', 'operacoes.Projeto.IdProjetoTipo')
    .where('operacoes.ProjetoAlocacao.IdColaborador', idColaborador)
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataInicio', '<=', diaReferenciaFim.toISOString())
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataFim', '>=', diaReferenciaInicio.toISOString())
    .select(
      'operacoes.Projeto.IdProjeto',
      'operacoes.ProjetoTipo.IdProjetoTipo',
      'operacoes.Projeto.Nome',
      'operacoes.ProjetoTipo.Descricao as ProjetoTipo'
    )
    .orderBy('operacoes.Projeto.Nome', 'asc')
}

const projetosByIdColaboradorSemana = async (idColaborador: Number, diaReferencia: Moment): Promise<ProjetoModel[]> => {
  const inicioSem = inicioSemana(diaReferencia)
  const fimSem = fimSemana(diaReferencia)

  return await dbConnection('operacoes.Projeto')
    .innerJoin('operacoes.ProjetoAlocacao', 'operacoes.ProjetoAlocacao.IdProjeto', 'operacoes.Projeto.IdProjeto')
    .innerJoin('operacoes.ProjetoAlocacaoPeriodo', 'operacoes.ProjetoAlocacaoPeriodo.IdProjetoAlocacao', 'operacoes.ProjetoAlocacao.IdProjetoAlocacao')
    .innerJoin('operacoes.ProjetoTipo', 'operacoes.ProjetoTipo.IdProjetoTipo', 'operacoes.Projeto.IdProjetoTipo')
    .where('operacoes.ProjetoAlocacao.IdColaborador', idColaborador)
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataInicio', '<=', fimSem.toISOString())
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataFim', '>=', inicioSem.toISOString())
    .select(
      'operacoes.Projeto.IdProjeto',
      'operacoes.ProjetoTipo.IdProjetoTipo',
      'operacoes.Projeto.Nome',
      'operacoes.ProjetoTipo.Descricao as ProjetoTipo'
    )
}

const projetoDefaultCadastradoSemana = async (idColaborador: Number, diaReferencia: Moment): Promise<ProjetoModel[]> => {
  const inicioSem = inicioSemana(diaReferencia)
  const fimSem = fimSemana(diaReferencia)

  return await dbConnection('operacoes.Projeto')
    .innerJoin('pessoas.Atividade', 'pessoas.Atividade.IdProjeto', 'operacoes.Projeto.IdProjeto')
    .innerJoin('operacoes.ProjetoTipo', 'operacoes.ProjetoTipo.IdProjetoTipo', 'operacoes.Projeto.IdProjetoTipo')
    .where('pessoas.Atividade.IdColaborador', idColaborador)
    .andWhere('pessoas.Atividade.DataAtividade', '<=', fimSem.toISOString())
    .andWhere('pessoas.Atividade.DataAtividade', '>=', inicioSem.toISOString())
    .andWhere('operacoes.ProjetoTipo.Descricao', 'Default')
    .select(
      'operacoes.Projeto.IdProjeto',
      'operacoes.ProjetoTipo.IdProjetoTipo',
      'operacoes.Projeto.Nome',
      'operacoes.ProjetoTipo.Descricao as ProjetoTipo'
    )
    .distinct()
}

/* retorna lista de projetos default */
const projetosDefault = async (diaReferencia: Moment): Promise<ProjetoModel[]> => {
  return await dbConnection('operacoes.Projeto')
    .innerJoin('operacoes.ProjetoTipo', 'operacoes.ProjetoTIpo.IdProjetoTipo', 'operacoes.Projeto.IdProjetoTipo')
    .where('operacoes.ProjetoTipo.Descricao', 'Default')
    .andWhere('operacoes.Projeto.DataInicial', '<=', diaReferencia.toISOString())
    .andWhere(function () {
      this.where('operacoes.Projeto.DataFinalAceite', '>=', diaReferencia.toISOString())
        .orWhere('operacoes.Projeto.DataFinalAceite', null)
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
  projetosByIdColaboradorSemana,
  projetosDefault,
  projetoDefaultCadastradoSemana
}

const inicioSemana = (data: Moment) => {
  let result = moment()
  if (moment(data.format('YYYY-MM-DD')).startOf('isoWeek').month() !== data.month()) {
    result = moment(data.format('YYYY-MM-DD')).utcOffset(0, true).startOf('month')
  } else {
    result = moment(data.format('YYYY-MM-DD')).utcOffset(0, true).startOf('isoWeek')
  }
  return result
}

const fimSemana = (data: Moment) => {
  let result = moment()
  if (moment(data.format('YYYY-MM-DD')).endOf('isoWeek').month() !== data.month()) {
    result = moment(data.format('YYYY-MM-DD')).utcOffset(0, true).endOf('month')
  } else {
    result = moment(data.format('YYYY-MM-DD')).utcOffset(0, true).endOf('isoWeek')
  }
  return result
}
