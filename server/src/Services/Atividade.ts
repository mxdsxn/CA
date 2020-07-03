/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { IAtividade, IProjeto } from '@models'
import timeUtc from '@timeUtc'

const AtividadeService = {
  GetAtividadesMesByIdColabMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)
    const listaAtividadeMes: IAtividade[] = await connKnex('pessoas.Atividade')
      .select('*')
      .where({
        IdColaborador: idColaborador
      })
      .where('DataAtividade', '>=', mesReferenciaInicio)
      .andWhere('DataAtividade', '<=', mesReferenciaFim)
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
