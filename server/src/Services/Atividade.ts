import connKnex from '@database'
import { IAtividade } from '@models'
import timeUtc from '@timeUtc'

const AtividadeService = {
  GetAtividadesMesByIdColabMes: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)
    const atividadesMes: IAtividade[] = await connKnex('pessoas.Atividade')
      .select('*')
      .where({
        IdColaborador: IdColab
      })
      .where('DataAtividade', '>=', mesReferenciaInicio)
      .andWhere('DataAtividade', '<=', mesReferenciaFim)
      .then(atvs => atvs)

    const idsProjeto = atividadesMes.map(x => x.IdProjeto)
    const NomesProjetos = await connKnex('operacoes.Projeto')
      .select('IdProjeto', 'Nome')
      .whereIn('IdProjeto', idsProjeto)
      .then(suc => {
        const nomes = suc.map(x => x)
        return nomes
      })
    atividadesMes.map(x => {
      x.Nome = NomesProjetos.filter(n => n.IdProjeto === x.IdProjeto)[0].Nome
    })
    console.log(NomesProjetos)
    return atividadesMes
  }
}

export default AtividadeService
