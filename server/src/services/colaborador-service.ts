/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import {
  IProjetoHistoricoGerente,
  IColaborador
} from '@models'
import libUtc from '@libUtc'

const ColaboradorService = {
  GetGerentesByIdColaboradorDia: async (DataCadastro: Date) => {
    const mesReferenciaInicio = libUtc.getBeginMonth(DataCadastro)
    const mesReferenciaFim = libUtc.getEndMonth(DataCadastro)

    const listaColaboradorGerente = await dbConnection('operacoes.ProjetoHistoricoGerente')
      .select(
        'IdProjetoHistoricoGerente',
        'IdColaborador',
        'IdProjeto',
        'DataInicio'
      )
      .where('DataInicio', '<=', mesReferenciaFim)
      .andWhere(function () {
        this.where('DataFim', '>=', mesReferenciaInicio)
          .orWhere('DataFim', null)
      })
      .orderBy('DataInicio', 'desc')
      .distinct()
      .then((listaHistoricoGerente: IProjetoHistoricoGerente[]) => {
        const listaIdColaboradorGerente = listaHistoricoGerente.map(gerente => gerente.IdColaborador)

        const listaColaboradorGerente = dbConnection('pessoas.Colaborador')
          .select(
            'IdColaborador',
            'Nome'
          )
          .whereIn('IdColaborador', listaIdColaboradorGerente)
          .orderBy('Nome', 'asc')
          .then((listaColaboradorGerente: IColaborador[]) => (listaColaboradorGerente))

        return listaColaboradorGerente
      })

    return validationArray(listaColaboradorGerente)
  }
}
export default ColaboradorService
