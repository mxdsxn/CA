/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import { IProjetoCategoriaAtividade } from '@models'

const ProjetoCategoriaAtividade = {
  /* retorna lista de categorias do projeto */
  GetProjetoCategoriaAtividadeByIdProjeto: async (IdProjeto: Number) => {
    const listaCategoriasProjeto = await dbConnection('operacoes.ProjetoCategoriaAtividade')
      .select('*')
      .where('IdProjeto', IdProjeto)
      .orderBy('Descricao', 'asc')
      .then((listaCategoriasProjeto: IProjetoCategoriaAtividade[]) => (listaCategoriasProjeto))

    return validationArray(listaCategoriasProjeto)
  }
}
export default ProjetoCategoriaAtividade
