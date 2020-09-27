import { ProjetoCategoriaAtividadeRepository as Repo } from '@repositories'

/* retorna lista de categorias do projeto */
const projetoCategoriaAtividadeByIdProjeto = async (idProjeto: Number) => {
  const listaCategoriasProjeto = await Repo.projetoCategoriaAtividadeByIdProjeto(idProjeto)

  return listaCategoriasProjeto
}
export default {
  projetoCategoriaAtividadeByIdProjeto
}
