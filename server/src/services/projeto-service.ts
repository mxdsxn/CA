/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import { IProjeto, IProjetoAlocacao, IProjetoAlocacaoPeriodo } from '@models'
import libUtc from '@libUtc'

const ProjetoService = {
  GetProjetosByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

    const listaProjeto = await dbConnection('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao', 'IdProjeto')
      .where(
        'IdColaborador', Number(idColaborador)
      )
      .then((listaProjetoAlocacao: IProjetoAlocacao[]) => {
        var listaIdProjetoAlocacao = listaProjetoAlocacao.map(x => x.IdProjetoAlocacao)

        const listaProjeto = dbConnection('operacoes.ProjetoAlocacaoPeriodo')
          .select('IdProjetoAlocacaoPeriodo', 'IdProjetoAlocacao')
          .whereIn('IdProjetoAlocacao', listaIdProjetoAlocacao)
          .where('DataInicio', '<=', diaReferenciaFim)
          .andWhere('DataFim', '>=', diaReferenciaInicio)
          .then((listaProjetoAlocacaoPerido: IProjetoAlocacaoPeriodo[]) => {
            const listaIdProjetoAlocacao = listaProjetoAlocacaoPerido.map(x => x.IdProjetoAlocacao)

            const listaIdProjeto = listaProjetoAlocacao.filter(x => listaIdProjetoAlocacao.includes(x.IdProjetoAlocacao))
              .map(x => x.IdProjeto)

            const listaProjeto = dbConnection('operacoes.Projeto')
              .select('IdProjeto', 'Nome')
              .whereIn('IdProjeto', listaIdProjeto)
              .orderBy('Nome', 'asc')
              .then((listaProjeto: IProjeto[]) => listaProjeto)

            return listaProjeto
          })

        return listaProjeto
      })

    return validationArray(listaProjeto)
  }
}
export default ProjetoService
