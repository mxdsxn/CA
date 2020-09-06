import { ProjetoMetodologiaFaseRepository as Repo } from '@repositories'

/* retorna lista de metodologiaFase do projeto */
const projetoFaseByIdProjeto = async (idProjeto: Number) => {
  const listaProjetoMetodologiaFase = await Repo.projetoFaseByIdProjeto(idProjeto)

  return listaProjetoMetodologiaFase
}

export default {
  projetoFaseByIdProjeto
}
