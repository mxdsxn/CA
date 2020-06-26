import connKnex from '@database'
import { IProjeto, IProjetoAlocacao } from '@models'

const ProjetoService = {
  GetProjetoByIdColabDia: async (IdColab: Number, DiaCadastro: Date) => {
    const DiaHoje = new Date()
    const trx = await connKnex.transaction()

    const idsProjetoAlocacao: IProjetoAlocacao[] = await trx('operacoes.ProjetoAlocacao')
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
          .then(suc => suc.map(x => x.IdProjetoAlocacao))
        return result
      })

    const idsProjeto = await connKnex('operacoes.ProjetoAlocacao')
      .select('IdProjeto')
      .whereIn('IdProjetoAlocacao', idsProjetoAlocacao)
      .then(suc => {
        const result = suc.map(x => x.IdProjeto)
        return result
      })

    const ListProjeto = await connKnex('operacoes.Projeto')
      .select('IdProjeto', 'Nome')
      .whereIn('IdProjeto', idsProjeto)
      .then(suc => suc)

    return ListProjeto
  }
}
export default ProjetoService
