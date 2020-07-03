/* eslint-disable no-unused-vars */
import connKnex from '@database'
import { IProjetoMetodologia, IProjetoMetodologiaFase } from '@models'

const ProjetoMetodologiaFaseService = {
  GetFaseByIdProjeto: async (IdProjeto: Number) => {
    const ProjetoMetodologia: IProjetoMetodologia = await connKnex('operacoes.ProjetoMetodologia')
      .select('*')
      .where('IdProjeto', IdProjeto)
      .orderBy('DataAtualizacao', 'desc')
      .first()
    const idProjetoMetodologia = ProjetoMetodologia.IdProjetoMetodologia
    const ProjetoMetodologiaFase: IProjetoMetodologiaFase[] = await connKnex('operacoes.ProjetoMetodologiaFase')
      .select('*')
      .where({ IdProjetoMetodologia: idProjetoMetodologia, Ativa: true })
      .distinct()
    return ProjetoMetodologiaFase
  }
}
export default ProjetoMetodologiaFaseService
