/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { IAtividade, IProjeto } from '@models'
import libUtc from '@libUtc'

const AtividadeService = {
  GetAtividadesMesByIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)
    const listaAtividadeMes: IAtividade[] = await connKnex('pessoas.Atividade')
      .select('*')
      .where({
        IdColaborador: idColaborador
      })
      .where('DataAtividade', '>=', mesReferenciaInicio)
      .andWhere('DataAtividade', '<=', mesReferenciaFim)
      .orderBy('DataAtividade', 'asc')
      .then(atvs => atvs)

    const listaIdsProjeto = listaAtividadeMes.map(x => x.IdProjeto)
    const listaNomesProjeto = await connKnex('operacoes.Projeto')
      .select('IdProjeto', 'Nome')
      .whereIn('IdProjeto', listaIdsProjeto)
      .then(suc => {
        const nomes: IProjeto[] = suc.map(x => x)
        return nomes
      })
    listaAtividadeMes.map(x => {
      x.Projeto = listaNomesProjeto.filter(n => n.IdProjeto === x.IdProjeto)[0].Nome
    })
    return listaAtividadeMes
  }
}

export default AtividadeService
