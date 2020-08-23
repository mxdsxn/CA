import { ProjetoCategoriaAtividadeRepository as Repo } from '@repositories'

/* retorna lista de categorias do projeto */
const ProjetoCategoriaAtividadeByIdProjeto = async (idProjeto: Number) => {
  const listaCategoriasProjeto = await Repo.ProjetoCategoriaAtividadeByIdProjeto(idProjeto)

  return listaCategoriasProjeto
}
export default {
  ProjetoCategoriaAtividadeByIdProjeto
}
