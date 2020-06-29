import connKnex from '@database'
import { IAtividade } from '@models'
import timeUtc from '@timeUtc'

const AtividadeService = {
  GetAtividadesMesByIdColabMes: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcNextMonth(mesReferenciaInicio)
    console.log(IdColab, Data)
    const atividadesMes: IAtividade[] = await connKnex('pessoas.Atividade')
      .select('*')
      .where({
        IdColaborador: IdColab
      })
      .where('DataAtividade', '>=', mesReferenciaInicio)
      .andWhere('DataAtividade', '<', mesReferenciaFim)
    return atividadesMes
  }
}

export default AtividadeService
