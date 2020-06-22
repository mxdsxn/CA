import connKnex from '@database'
import { IAtividade } from '@models'

const AtividadeService = {
  GetAtividadesByDataColaboradores: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim =
      mesReferenciaInicio.getMonth() < 11
        ? new Date(
          `${
          mesReferenciaInicio.getMonth() + 2
          }/1/${mesReferenciaInicio.getFullYear()}`
        )
        : mesReferenciaInicio.getMonth() === 11
          ? new Date(`1/1/${mesReferenciaInicio.getFullYear() + 1}`)
          : new Date()

    const atividadesMes: IAtividade[] = await connKnex
      .select('*')
      .from('pessoas.Atividade')
      .where({
        IdColaborador: IdColab
      })
      .where('DataAtividade', '>=', mesReferenciaInicio)
      .andWhere('DataAtividade', '<', mesReferenciaFim)

    // const projetos = await connKnex()
    //   .from('operacoes.Projeto')
    //   .join('pessoas.Atividade', 'operacoes.Projeto.IdProjeto', '=', 'pessoas.Atividade.IdProjeto')
    //   .select('*')
    //   .where('operacoes.Projeto.IdProjeto', 2510)
    //   .first()
    return atividadesMes
  }
}

export default AtividadeService
