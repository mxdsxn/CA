/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoMetodologia, IProjetoMetodologiaFase } from '@models'

const ProjetoMetodologiaFaseService = {
  GetProjetoFaseByIdProjeto: async (IdProjeto: Number) => {
    const listaProjetoMetodologiaFase = await dbConnection('operacoes.ProjetoMetodologia')
      .select('IdProjetoMetodologia')
      .where('IdProjeto', IdProjeto)
      .orderBy('DataAtualizacao', 'desc')
      .first()
      .then((projetoMetodologia: IProjetoMetodologia) => {
        const listaIdProjetoMetodologia = projetoMetodologia.IdProjetoMetodologia
        const listaProjetoMetodologiaFase = dbConnection('operacoes.ProjetoMetodologiaFase')
          .select('*')
          .where({
            IdProjetoMetodologia: listaIdProjetoMetodologia,
            Ativa: true
          })
          .orderBy('Fase', 'asc')
          .distinct()
          .then((listaProjetoMetodologiaFase: IProjetoMetodologiaFase[]) => (listaProjetoMetodologiaFase))
        return listaProjetoMetodologiaFase
      })
    return listaProjetoMetodologiaFase
  }
}
export default ProjetoMetodologiaFaseService
