/* eslint-disable no-unused-vars */
import dbConnection  from '@database'
import { IProjeto, IProjetoAlocacao, IProjetoAlocacaoPeriodo, IProjetoTipo } from '@models'
import libUtc from '@libUtc'

/* retorna lista de projetos que o colaborador esta alocado naquele dia */
const GetProjetosByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
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
              'IdProjetoTipo',
              'Nome'
            )
            .where('IdProjetoTipo', '<>', idProjetoDefault)
            .whereIn('IdProjeto', listaIdProjeto)
            .orderBy('Nome', 'asc')
            .then((listaProjeto: IProjeto[]) => {
              const listaIdsProjetoTipo = listaProjeto.map(x => x.IdProjetoTipo)
              return dbConnection('operacoes.ProjetoTipo')
                .select('*')
                .whereIn('IdProjetoTipo', listaIdsProjetoTipo)
                .then((listaProjetoTipo: IProjetoTipo[]) => {
                  listaProjeto.map(proj => {
                    if (listaProjetoTipo.find(x => x.IdProjetoTipo === proj.IdProjetoTipo)) { proj.ProjetoTipo = listaProjetoTipo.filter(projTipo => projTipo.IdProjetoTipo === proj.IdProjetoTipo)[0].Descricao } else { proj.ProjetoTipo = '' }
                  })
                  return listaProjeto
                })
            })
          return listaProjeto
        })
      return listaProjeto
    })
  return listaProjeto
}
/* retorna lista de projetos default */
const GetProjetosDefault = async (diaReferencia: Date) => {
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

  return (listaProjetosDefault)
}

export default {
  GetProjetosByIdColaboradorDia,
  GetProjetosDefault
}
