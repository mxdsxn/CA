/* eslint-disable no-unused-vars */

import connKnex from '@database'
import { IProjetoCategoriaAtividade } from '@models'

const ProjetoCategoriaAtividade = {
  GetCategoriaAtividadeByIdProjeto: async (IdProjeto: Number) => {
    const listaCategoriasProjeto: IProjetoCategoriaAtividade[] = await connKnex('operacoes.ProjetoCategoriaAtividade')
      .select('*')
      .where('IdProjeto', IdProjeto)
      .orderBy('IdProjetoCategoriaAtividade', 'desc')
    return listaCategoriasProjeto
  }
}
export default ProjetoCategoriaAtividade
