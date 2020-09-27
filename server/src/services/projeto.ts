import { ProjetoRepository as Repo } from '@repositories'
import { Moment } from 'moment'

/* retorna lista de projetos que o colaborador esta alocado naquele dia */
const projetosByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Moment) => {
  const listaProjeto = await Repo.projetosByIdColaboradorDia(idColaborador, diaReferencia)

  return listaProjeto
}
/* retorna lista de projetos default */
const projetosDefault = async (diaReferencia: Moment) => {
  const listaprojetosDefault = await Repo.projetosDefault(diaReferencia)

  return listaprojetosDefault
}

export default {
  projetosByIdColaboradorDia,
  projetosDefault
}
