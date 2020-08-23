/* eslint-disable no-unused-vars */
import { ProjetoRepository as Repo } from '@repositories'

/* retorna lista de projetos que o colaborador esta alocado naquele dia */
const ProjetosByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const listaProjeto = await Repo.ProjetosByIdColaboradorDia(idColaborador, diaReferencia)

  return listaProjeto
}
/* retorna lista de projetos default */
const ProjetosDefault = async (diaReferencia: Date) => {
  const listaProjetosDefault = await Repo.ProjetosDefault(diaReferencia)

  return (listaProjetosDefault)
}

export default {
  ProjetosByIdColaboradorDia,
  ProjetosDefault
}
