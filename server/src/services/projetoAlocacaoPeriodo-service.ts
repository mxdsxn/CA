/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoAlocacaoPeriodo, IProjetoAlocacao } from '@models'
import libUtc from '@libUtc'

const ProjetoAlocacaoPeriodoService = {
  GetProjetoAlocacaoPeriodoByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDay(diaReferenciaInicio)
    const ListProjetoAlocacaoPeriodo: IProjetoAlocacaoPeriodo[] = await dbConnection('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(idColaborador)
      )
      .then(suc => {
        var ListIdProjetoAlocacao: IProjetoAlocacao[] = suc.map(x => x.IdProjetoAlocacao)
        const result = dbConnection('operacoes.ProjetoAlocacaoPeriodo')
          .select('*')
          .whereIn('IdProjetoAlocacao', ListIdProjetoAlocacao)
          .where('DataInicio', '<=', diaReferenciaFim)
          .andWhere('DataFim', '>=', diaReferenciaInicio)
          .orderBy('DataInicio', 'asc')
          .then(suc => suc as IProjetoAlocacaoPeriodo[])
        return result
      })

    return ListProjetoAlocacaoPeriodo
  }
}
export default ProjetoAlocacaoPeriodoService
