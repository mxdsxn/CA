import connKnex from '@database'
import { IProjetoAlocacaoPeriodo, IProjetoAlocacao } from '@models'

const ProjetoAlocacaoPeriodoService = {
  GetProjetoAlocacaoPeriodoByIdColabDia: async (IdColab: Number, DiaCadastro: Date) => {
    const trx = await connKnex.transaction()
    const ListProjetoAlocacaoPeriodo: IProjetoAlocacaoPeriodo[] = await trx('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(IdColab)
      )
      .then(suc => {
        var ListIdProjetoAlocacao: IProjetoAlocacao[] = suc.map(x => x.IdProjetoAlocacao)
        const result = connKnex('operacoes.ProjetoAlocacaoPeriodo')
          .select('*')
          .whereIn('IdProjetoAlocacao', ListIdProjetoAlocacao)
          .where('DataInicio', '<=', DiaCadastro)
          .andWhere('DataFim', '>=', DiaCadastro)
          .then(suc => suc)
        return result
      })

    return ListProjetoAlocacaoPeriodo
  }
}
export default ProjetoAlocacaoPeriodoService
