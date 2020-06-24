import connKnex from '@database'
import { IProjetoAlocacao } from '@models'

const TesteService = {
  Teste: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim =
      mesReferenciaInicio.getMonth() < 11
        ? new Date(
          `${
          mesReferenciaInicio.getMonth() + 2
          }/1/${mesReferenciaInicio.getFullYear()}`
        )
        : mesReferenciaInicio.getMonth() === 11
          ? new Date(`1/1/${mesReferenciaInicio.getFullYear() + 1}`)
          : new Date()

    const trx = await connKnex.transaction()
    const ListProjetoAlocacaoPeriodo = await trx('operacoes.ProjetoAlocacao')
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
          .andWhere('DataFim', '>=', mesReferenciaInicio)
          .then(suc => suc)
        return result
      })

    return ListProjetoAlocacaoPeriodo
  }
}
export default TesteService
