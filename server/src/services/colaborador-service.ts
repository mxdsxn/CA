/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import {
  IColaborador,
  IProjeto,
  IProjetoHistoricoGerente
} from '@models'
import libUtc from '@libUtc'

import { ProjetoService } from '@services'

const ColaboradorService = {
  GetGerentesByIdColaboradorDia: async (diaReferencia: Date) => {
    const mesReferenciaInicio = libUtc.getBeginMonth(diaReferencia)
    const mesReferenciaFim = libUtc.getEndMonth(diaReferencia)

    const idColaborador = 2359
    const listaIdsProjetoAlocado = await ProjetoService.GetProjetosByIdColaboradorDia(idColaborador, diaReferencia)
      .then((listaProjetos: IProjeto[]) => {
        const listaIdsProjetoAlocado = listaProjetos.map(
          projeto => projeto.IdProjeto
        )
        return listaIdsProjetoAlocado
      })

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
      .whereIn('IdProjeto', listaIdsProjetoAlocado)
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
