/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoAlocacaoPeriodo, IProjetoAlocacao } from '@models'
import libUtc from '@libUtc'

const ProjetoAlocacaoPeriodoService = {
  GetProjetoAlocacaoPeriodoByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDay(diaReferenciaInicio)
    const listaProjetoAlocacaoPeriodo = await dbConnection('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(idColaborador)
      )
      .then((listaProjetoAlocacao: IProjetoAlocacaoPeriodo[]) => {
        var listaIdProjetoAlocacao = listaProjetoAlocacao.map(x => x.IdProjetoAlocacao)
        const listaProjetoAlocacaoPeriodo = dbConnection('operacoes.ProjetoAlocacaoPeriodo')
          .select('*')
          .whereIn('IdProjetoAlocacao', listaIdProjetoAlocacao)
          .where('DataInicio', '<=', diaReferenciaFim)
          .andWhere('DataFim', '>=', diaReferenciaInicio)
          .orderBy('DataInicio', 'asc')
          .then((listaProjetoAlocacaoPeriodo: IProjetoAlocacaoPeriodo[]) => listaProjetoAlocacaoPeriodo)
        return listaProjetoAlocacaoPeriodo
      })

    return listaProjetoAlocacaoPeriodo
  }
}
export default ProjetoAlocacaoPeriodoService
