/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoMetodologia, IProjetoMetodologiaFase } from '@models'

const validation = (result: any) => {
  // console.log(typeof result)
  (
    typeof result === 'object' &&
    result !== undefined
  ) ||
    (
      typeof result === 'object' &&
      result.lenght > 0
    )
    ? return ('ok')
    : return (null)
return () => {
}
}

const ProjetoMetodologiaFaseService = {
  GetProjetoFaseByIdProjeto: async (IdProjeto: Number) => {
    const listaProjetoMetodologiaFase = await dbConnection('operacoes.ProjetoMetodologia')
      .select('IdProjetoMetodologia')
      .where('IdProjeto', IdProjeto)
      .orderBy('DataAtualizacao', 'desc')
      .first()
      .then((projetoMetodologia: IProjetoMetodologia) => {
        validation(projetoMetodologia)

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

    validation(listaProjetoMetodologiaFase)
    return listaProjetoMetodologiaFase || null
  }
}
export default ProjetoMetodologiaFaseService
