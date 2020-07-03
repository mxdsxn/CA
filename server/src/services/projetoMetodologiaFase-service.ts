/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoMetodologia, IProjetoMetodologiaFase } from '@models'

const ProjetoMetodologiaFaseService = {
  GetProjetoFaseByIdProjeto: async (IdProjeto: Number) => {
    const ProjetoMetodologia: IProjetoMetodologia = await dbConnection('operacoes.ProjetoMetodologia')
      .select('*')
      .where('IdProjeto', IdProjeto)
      .orderBy('DataAtualizacao', 'desc')
      .first()
    const idProjetoMetodologia = ProjetoMetodologia.IdProjetoMetodologia
    const ProjetoMetodologiaFase: IProjetoMetodologiaFase[] = await dbConnection('operacoes.ProjetoMetodologiaFase')
      .select('*')
      .where({ IdProjetoMetodologia: idProjetoMetodologia, Ativa: true })
      .orderBy('Fase', 'asc')
      .distinct()
    return ProjetoMetodologiaFase
  }
}
export default ProjetoMetodologiaFaseService
