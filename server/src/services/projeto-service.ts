/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import { IProjeto, IProjetoAlocacao, IProjetoAlocacaoPeriodo, IProjetoTipo } from '@models'
import libUtc from '@libUtc'

const ProjetoService = {
  /* retorna lista de projetos que o colaborador esta alocado naquele dia */
  GetProjetosByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const diaReferenciaInicio = diaReferencia
    const diaReferenciaFim = libUtc.getEndDate(diaReferenciaInicio)

    const idProjetoDefault = await dbConnection('operacoes.ProjetoTipo')
      .select('*')
      .where('Descricao', 'Default')
      .first()
      .then((TipoDefault: IProjetoTipo) => TipoDefault.IdProjetoTipo)

    const listaProjeto = await dbConnection('operacoes.ProjetoAlocacao')
      .select(
        'IdProjetoAlocacao',
        'IdProjeto'
      )
      .where('IdColaborador', Number(idColaborador))
      .then((listaProjetoAlocacao: IProjetoAlocacao[]) => {
        var listaIdProjetoAlocacao = listaProjetoAlocacao.map(x => x.IdProjetoAlocacao)

        const listaProjeto = dbConnection('operacoes.ProjetoAlocacaoPeriodo')
          .select(
            'IdProjetoAlocacaoPeriodo',
            'IdProjetoAlocacao'
          )
          .whereIn('IdProjetoAlocacao', listaIdProjetoAlocacao)
          .where('DataInicio', '<=', diaReferenciaFim)
          .andWhere('DataFim', '>=', diaReferenciaInicio)
          .then((listaProjetoAlocacaoPerido: IProjetoAlocacaoPeriodo[]) => {
            const listaIdProjetoAlocacao = listaProjetoAlocacaoPerido.map(x => x.IdProjetoAlocacao)

            const listaIdProjeto = listaProjetoAlocacao.filter(x => listaIdProjetoAlocacao.includes(x.IdProjetoAlocacao))
              .map(x => x.IdProjeto)

            const listaProjeto = dbConnection('operacoes.Projeto')
              .select(
                'IdProjeto',
                'Nome'
              )
              .where('IdProjetoTipo', '<>', idProjetoDefault)
              .whereIn('IdProjeto', listaIdProjeto)
              .orderBy('Nome', 'asc')
              .then((listaProjeto: IProjeto[]) => listaProjeto)

            return listaProjeto
          })

        return listaProjeto
      })

    return validationArray(listaProjeto)
  },
  /* retorna lista de projetos default */
  GetProjetosDefault: async (diaReferencia: Date) => {
    const idProjetoDefault = await dbConnection('operacoes.ProjetoTipo')
      .select('IdProjetoTipo')
      .where('Descricao', 'Default')
      .first()
      .then((TipoDefault: IProjetoTipo) => TipoDefault.IdProjetoTipo)

    const listaProjetosDefault = await dbConnection('operacoes.Projeto')
      .select(
        'IdProjeto',
        'Nome'
      )
      .where('IdProjetoTipo', idProjetoDefault)
      .andWhere('DataInicial', '<=', diaReferencia)
      .andWhere(function () {
        this.where('DataFinalAceite', '>=', diaReferencia)
          .orWhere('DataFinalAceite', null)
      })
      .then((listaProjetosDefault: IProjeto[]) => listaProjetosDefault)

    return validationArray(listaProjetosDefault)
  }
}
export default ProjetoService
