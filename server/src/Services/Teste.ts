import connKnex from '@database'
import { IProjetoAlocacao } from '@models'
import timeUtc from '@timeUtc'

const TesteService = {
  Teste: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

    // testes com RUMO 2417

    const tst = await connKnex('operacoes.ProjetoCategoriaAtividade')
      .select('*')
      .where('IdProjeto', 2417)
    // .first()
    return tst
  }
}
export default TesteService
