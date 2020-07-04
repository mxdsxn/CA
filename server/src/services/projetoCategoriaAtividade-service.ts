/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoCategoriaAtividade } from '@models'

const ProjetoCategoriaAtividade = {
  GetProjetoCategoriaAtividadeByIdProjeto: async (IdProjeto: Number) => {
    const listaCategoriasProjeto = await dbConnection('operacoes.ProjetoCategoriaAtividade')
      .select('*')
      .where('IdProjeto', IdProjeto)
      .orderBy('Descricao', 'asc')
      .then((listaCategoriasProjeto: IProjetoCategoriaAtividade[]) => (listaCategoriasProjeto))
    return listaCategoriasProjeto
  }
}
export default ProjetoCategoriaAtividade
