/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { IProjetoAlocacaoPeriodo, IProjetoAlocacao } from '@models'

const ProjetoAlocacaoPeriodoService = {
  GetProjetoAlocacaoPeriodoByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const ListProjetoAlocacaoPeriodo: IProjetoAlocacaoPeriodo[] = await connKnex('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(idColaborador)
      )
      .then(suc => {
        var ListIdProjetoAlocacao: IProjetoAlocacao[] = suc.map(x => x.IdProjetoAlocacao)
        const result = connKnex('operacoes.ProjetoAlocacaoPeriodo')
          .select('*')
          .whereIn('IdProjetoAlocacao', ListIdProjetoAlocacao)
          .where('DataInicio', '<=', diaReferencia)
          .andWhere('DataFim', '>=', diaReferencia)
          .orderBy('DataInicio', 'asc')
          .then(suc => suc as IProjetoAlocacaoPeriodo[])
        return result
      })

    return ListProjetoAlocacaoPeriodo
  }
}
export default ProjetoAlocacaoPeriodoService
