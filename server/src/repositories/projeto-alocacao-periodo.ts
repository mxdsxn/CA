import dbConnection from '@database'
import libUtc from '@libUtc'
// eslint-disable-next-line no-unused-vars
import { ProjetoAlocacaoEntity } from '@entities'

const ProjetoAlocacaoPeriodoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date): Promise<ProjetoAlocacaoEntity[]> => {
  const diaReferenciaInicio = diaReferencia
  const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

  return await dbConnection('operacoes.ProjetoAlocacaoPeriodo')
    .innerJoin('operacoes.ProjetoAlocacao', 'operacoes.ProjetoAlocacao.IdProjetoAlocacao', 'operacoes.ProjetoAlocacaoPeriodo.IdProjetoAlocacao')
    .where('operacoes.ProjetoAlocacao.IdColaborador', idColaborador)
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataInicio', '<=', diaReferenciaFim)
    .andWhere('operacoes.ProjetoAlocacaoPeriodo.DataFim', '>=', diaReferenciaInicio)
    .select('operacoes.ProjetoAlocacaoPeriodo.*')
    .orderBy('operacoes.ProjetoAlocacaoPeriodo.DataInicio', 'asc')
}

export default {
  ProjetoAlocacaoPeriodoByIdColaboradorDia
}
