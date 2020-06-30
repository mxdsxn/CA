import connKnex from '@database'
import { IProjetoAlocacao } from '@models'
import timeUtc from '@timeUtc'

const TesteService = {
  Teste: async (IdColab: Number, Data: Date) => {
    const mesReferenciaInicio = Data
    const mesReferenciaFim = timeUtc.utcEndMonth(mesReferenciaInicio)

    // testes com RUMO 2417

    const Projeto = await connKnex('operacoes.Projeto')
      .select('*')
      .where('IdProjeto', 2417)
    const ProjetoMetodologia = await connKnex('operacoes.ProjetoMetodologia')
      .select('*')
      .where('IdProjeto', 2417)
      .orderBy('DataAtualizacao', 'desc')
      .first()
    console.log(ProjetoMetodologia)
    const idProjetoMetodologia = ProjetoMetodologia.IdProjetoMetodologia
    const ProjetoMetodologiaFase = await connKnex('operacoes.ProjetoMetodologiaFase')
      .select('*')
      .where({ IdProjetoMetodologia: idProjetoMetodologia, Ativa: true })
      .distinct()
    // const tst = await connKnex('operacoes.ProjetoMetodologiaFaseArtefato')
    // .first()
    return ProjetoMetodologiaFase
  }
}
export default TesteService
