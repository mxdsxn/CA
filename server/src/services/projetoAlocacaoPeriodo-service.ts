/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import { IProjetoAlocacaoPeriodo, IProjetoAlocacao } from '@models'
import libUtc from '@libUtc'

const ProjetoAlocacaoPeriodoService = {
  /* retorna lista de alocacoes do colaborador no dia */
  GetProjetoAlocacaoPeriodoByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

    const listaProjetoAlocacaoPeriodo = await dbConnection('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(idColaborador)
      )
      .then((listaProjetoAlocacao: IProjetoAlocacao[]) => {
        var listaIdProjetoAlocacao = listaProjetoAlocacao.map(x => x.IdProjetoAlocacao)

        const listaProjetoAlocacaoPeriodo = dbConnection('operacoes.ProjetoAlocacaoPeriodo')
          .select('*')
          .whereIn('IdProjetoAlocacao', listaIdProjetoAlocacao)
          .where('DataInicio', '<=', diaReferenciaFim)
          .andWhere('DataFim', '>=', diaReferenciaInicio)
          .orderBy('DataInicio', 'asc')
          .then((listaProjetoAlocacaoPeriodo: IProjetoAlocacaoPeriodo[]) => listaProjetoAlocacaoPeriodo)
        // return listaProjetoAlocacao.map(x => x.ListaAlocacaoPeriodo = listaProjetoAlocacaoPeriodo.filter(y => y.IdProjetoAlocacao == x.IdProjetoAlocacao))

        return listaProjetoAlocacaoPeriodo
      })

    return validationArray(listaProjetoAlocacaoPeriodo)
  }
}
export default ProjetoAlocacaoPeriodoService
