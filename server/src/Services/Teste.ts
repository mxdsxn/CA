import connKnex from '@database'

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

    const idsProjAlocados = await connKnex()
      .select('IdProjetoAlocacaoPeriodo')
      .from('operacoes.ProjetoAlocacao')
      .where({
        IdColaborador: IdColab
      })
      .join('operacoes.ProjetoAlocacaoPeriodo', 'operacoes.ProjetoAlocacao.IdProjetoAlocacao', ' operacoes.ProjetoAlocacaoPeriodo.IdProjetoAlocacao')
      .distinct()

    const AlocPeriodo = idsProjAlocados.map(
      async item => {
        await connKnex()
          .select('*')
          .from('operacoes.ProjetoAlocacaoPeriodo')
          .where({
            IdProjetoAlocacaoPeriodo: item.IdProjetoAlocacaoPeriodo
          })
          .where('DataInicio', '<=', mesReferenciaInicio)
          .andWhere('DataFim', '>=', mesReferenciaInicio)
          .distinct()
          .first().then(suc => suc)
      }
    )
    return { msg: idsProjAlocados }
  }
}

export default TesteService
