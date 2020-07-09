/* eslint-disable no-unused-vars */
import dbConnection, { validationObject } from '@database'
import { IProjetoMetodologia, IProjetoMetodologiaFase } from '@models'

const ProjetoMetodologiaFaseService = {
  /* retorna lista de metodologiaFase do projeto */
  GetProjetoFaseByIdProjeto: async (IdProjeto: Number) => {
    const listaProjetoMetodologiaFase = await dbConnection('operacoes.ProjetoMetodologia')
      .select('IdProjetoMetodologia')
      .where('IdProjeto', IdProjeto)
      .orderBy('DataAtualizacao', 'desc')
      .first()
      .then((projetoMetodologia: IProjetoMetodologia) => {
        if (!validationObject(projetoMetodologia)) { return null }
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
