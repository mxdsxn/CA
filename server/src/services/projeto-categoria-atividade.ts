/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoCategoriaAtividade } from '@models'

/* retorna lista de categorias do projeto */
const ProjetoCategoriaAtividadeByIdProjeto = async (IdProjeto: Number) => {
  const listaCategoriasProjeto = await dbConnection('operacoes.ProjetoCategoriaAtividade')
    .where('IdProjeto', IdProjeto)
    .select('*')
    .orderBy('Descricao', 'asc')

  return (listaCategoriasProjeto)
}
export default {
  ProjetoCategoriaAtividadeByIdProjeto
}
