/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoCategoriaAtividade } from '@models'

const ProjetoCategoriaAtividade = {
  GetProjetoCategoriaAtividadeByIdProjeto: async (IdProjeto: Number) => {
    const listaCategoriasProjeto: IProjetoCategoriaAtividade[] = await dbConnection('operacoes.ProjetoCategoriaAtividade')
      .select('*')
      .where('IdProjeto', IdProjeto)
      .orderBy('Descricao', 'asc')
    return listaCategoriasProjeto
  }
}
export default ProjetoCategoriaAtividade
