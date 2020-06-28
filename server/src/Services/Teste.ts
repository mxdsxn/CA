import connKnex from '@database'
import { IProjetoAlocacao } from '@models'
import timeUtc from '@timeUtc'

const TesteService = {
  Teste: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcNextMonth(mesReferenciaInicio)

    const ListProjetoAlocacaoPeriodo = await connKnex('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(IdColab)
      )
      .then(suc => {
        var ListIdProjetoAlocacao = suc.map(x => x.IdProjetoAlocacao)
        const result = connKnex('operacoes.ProjetoAlocacaoPeriodo')
          .select('*')
          .whereIn('IdProjetoAlocacao', ListIdProjetoAlocacao)
          .where('DataInicio', '<=', mesReferenciaInicio)
          .andWhere('DataFim', '>=', mesReferenciaFim)
          .then(suc => suc)
        return result
      })

    return ListProjetoAlocacaoPeriodo
  }
}
export default TesteService
