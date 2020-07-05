/* eslint-disable no-unused-vars */
import dbConnection, { validationResult } from '@database'
import { IAtividade, IProjeto } from '@models'
import libUtc from '@libUtc'

const AtividadeService = {
  GetAtividadesMesByIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)
    const listaAtividadeMes = await dbConnection('pessoas.Atividade')
      .select('*')
      .where({
        IdColaborador: idColaborador
      })
      .where('DataAtividade', '>=', mesReferenciaInicio)
      .andWhere('DataAtividade', '<=', mesReferenciaFim)
      .orderBy('DataAtividade', 'asc')
      .then((listaAtividadeMes: IAtividade[]) => {
        validationResult(listaAtividadeMes)
        const listaIdsProjeto = listaAtividadeMes.map(x => x.IdProjeto)
        const listaAtividadeComNomeProjeto = dbConnection('operacoes.Projeto')
          .select('IdProjeto', 'Nome')
          .whereIn('IdProjeto', listaIdsProjeto)
          .then((listaNomesProjeto: IProjeto[]) => {
            listaAtividadeMes.map(atividade => {
              atividade.Projeto = listaNomesProjeto.filter(nomeProjeto => nomeProjeto.IdProjeto === atividade.IdProjeto)[0].Nome
            })
            return listaAtividadeMes
          })
        return listaAtividadeComNomeProjeto
      })

    return listaAtividadeMes
  }
}

export default AtividadeService
