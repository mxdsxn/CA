import connKnex from '@database'
import { IProjeto, IProjetoAlocacao } from '@models'

const ProjetoService = {
  GetProjetoByIdColabDia: async (IdColab: Number, DiaCadastro: Date) => {
    const ListProjeto: IProjetoAlocacao[] = await connKnex('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(IdColab)
      )
      .then(suc => {
        var ListIdProjetoAlocacao: IProjetoAlocacao[] = suc.map(x => x.IdProjetoAlocacao)
        const result = connKnex('operacoes.ProjetoAlocacaoPeriodo')
          .select('IdProjetoAlocacao')
          .whereIn('IdProjetoAlocacao', ListIdProjetoAlocacao)
          .where('DataInicio', '<=', DiaCadastro)
          .andWhere('DataFim', '>=', DiaCadastro)
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
                  .then(suc => suc)
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
