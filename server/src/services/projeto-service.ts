/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjeto, IProjetoAlocacao } from '@models'
import libUtc from '@libUtc'

const ProjetoService = {
  GetProjetosByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDay(diaReferenciaInicio)
    const ListProjeto: IProjeto[] = await dbConnection('operacoes.ProjetoAlocacao')
      .select('IdProjetoAlocacao')
      .where(
        'IdColaborador', Number(idColaborador)
      )
      .then(suc => {
        var ListIdProjetoAlocacao: IProjetoAlocacao[] = suc.map(x => x.IdProjetoAlocacao)
        const result = dbConnection('operacoes.ProjetoAlocacaoPeriodo')
          .select('IdProjetoAlocacao')
          .whereIn('IdProjetoAlocacao', ListIdProjetoAlocacao)
          .where('DataInicio', '<=', diaReferenciaFim)
          .andWhere('DataFim', '>=', diaReferenciaInicio)
          .then(suc => {
            const idsProjetoAlocacao = suc.map(x => x.IdProjetoAlocacao)
            const ListProjeto = dbConnection('operacoes.ProjetoAlocacao')
              .select('IdProjeto')
              .whereIn('IdProjetoAlocacao', idsProjetoAlocacao)
              .then(suc => {
                const idsProjeto = suc.map(x => x.IdProjeto)
                const ListProjeto = dbConnection('operacoes.Projeto')
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
