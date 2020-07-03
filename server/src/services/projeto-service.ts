/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { IProjeto, IProjetoAlocacao } from '@models'

const ProjetoService = {
  GetProjetosByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const ListProjeto: IProjeto[] = await connKnex('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(idColaborador)
      )
      .then(suc => {
        var ListIdProjetoAlocacao: IProjetoAlocacao[] = suc.map(x => x.IdProjetoAlocacao)
        const result = connKnex('operacoes.ProjetoAlocacaoPeriodo')
          .select('IdProjetoAlocacao')
          .whereIn('IdProjetoAlocacao', ListIdProjetoAlocacao)
          .where('DataInicio', '<=', diaReferencia)
          .andWhere('DataFim', '>=', diaReferencia)
          .then(suc => {
            const idsProjetoAlocacao = suc.map(x => x.IdProjetoAlocacao)
            const ListProjeto = connKnex('operacoes.ProjetoAlocacao')
              .select('IdProjeto')
              .whereIn('IdProjetoAlocacao', idsProjetoAlocacao)
              .then(suc => {
                const idsProjeto = suc.map(x => x.IdProjeto)
                const ListProjeto = connKnex('operacoes.Projeto')
                  .select('IdProjeto', 'Nome')
                  .whereIn('IdProjeto', idsProjeto)
                  .orderBy('Nome', 'asc')
                  .then(suc => suc as IProjeto[])
                return ListProjeto
              })
            return ListProjeto
          })
        return result
      })

    return ListProjeto
  }
}
export default ProjetoService
