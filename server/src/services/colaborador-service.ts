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
  /* retorna lista de coordenadores(gerentes de projetos), para aprovaçao de atividades em projetos Default */
  GetCoordenadoresByDia: async (diaReferencia: Date) => {
    const mesReferenciaInicio = libUtc.getBeginMonth(diaReferencia)
    const mesReferenciaFim = libUtc.getEndMonth(diaReferencia)

    const listaCoordenador = await dbConnection('operacoes.ProjetoHistoricoGerente')
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

        const listaCoordenador = dbConnection('pessoas.Colaborador')
          .select(
            'IdColaborador',
            'Nome'
          )
          .whereIn('IdColaborador', listaIdColaboradorGerente)
          .orderBy('Nome', 'asc')
          .then((listaCoordenador: IColaborador[]) => (listaCoordenador))

        return listaCoordenador
      })

    return validationArray(listaCoordenador)
  }
}
export default ColaboradorService
