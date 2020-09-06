import { ProjetoRepository as Repo } from '@repositories'

/* retorna lista de projetos que o colaborador esta alocado naquele dia */
const projetosByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const listaProjeto = await Repo.projetosByIdColaboradorDia(idColaborador, diaReferencia)

  return listaProjeto
}
/* retorna lista de projetos default */
const projetosDefault = async (diaReferencia: Date) => {
  const listaprojetosDefault = await Repo.projetosDefault(diaReferencia)

  return listaprojetosDefault
}

export default {
  projetosByIdColaboradorDia,
  projetosDefault
}
