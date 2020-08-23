/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoAlocacaoPeriodo, IProjetoAlocacao } from '@models'
import libUtc from '@libUtc'

/* retorna lista de alocacoes do colaborador no dia */
const ProjetoAlocacaoPeriodoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const diaReferenciaInicio = diaReferencia
  const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

  const listaProjetoAlocacaoPeriodo = await dbConnection('operacoes.ProjetoAlocacaoPeriodo')
    .innerJoin('operacoes.ProjetoAlocacao', 'operacoes.ProjetoAlocacao.IdProjetoAlocacao', 'operacoes.ProjetoAlocacaoPeriodo.IdProjetoAlocacao')
    .where('operacoes.ProjetoAlocacao.IdColaborador', idColaborador)
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataInicio', '<=', diaReferenciaFim)
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataFim', '>=', diaReferenciaInicio)
    .select('operacoes.ProjetoAlocacaoPeriodo.*')
    .orderBy('operacoes.ProjetoAlocacaoPeriodo.DataInicio', 'asc')

  return (listaProjetoAlocacaoPeriodo)
}

export default {
  ProjetoAlocacaoPeriodoByIdColaboradorDia
}
