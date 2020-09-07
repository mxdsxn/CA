/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import libUtc from '@libUtc'
import { ColaboradorContratoEntity } from '@entities'
import moment, { Moment } from 'moment'

const coordenadorByDia = async (diaReferencia: Moment): Promise<ColaboradorContratoEntity[]> => {
  const mesReferenciaInicio = moment(diaReferencia).startOf('month')
  const mesReferenciaFim = moment(diaReferencia).endOf('month')

  return await dbConnection('pessoas.Colaborador')
    .innerJoin('operacoes.ProjetoHistoricoGerente', 'operacoes.ProjetoHistoricoGerente.IdColaborador', 'pessoas.Colaborador.IdColaborador')
    .where(function () {
      this.where('operacoes.ProjetoHistoricoGerente.DataFim', '>=', mesReferenciaInicio.toISOString())
        .orWhere('operacoes.ProjetoHistoricoGerente.DataFim', null)
    })
    .andWhere('operacoes.ProjetoHistoricoGerente.DataInicio', '<', mesReferenciaFim.toISOString())
    .select(
      'pessoas.Colaborador.IdColaborador',
      'pessoas.Colaborador.Nome'
    )
    .orderBy('pessoas.Colaborador.Nome', 'asc')
    .distinct()
}

const colaboradorById = (idColaborador: number) => {
  return dbConnection('pessoas.Colaborador')
    .where({ IdColaborador: idColaborador })
    .first()
}

export default {
  colaboradorById,
  coordenadorByDia
}
