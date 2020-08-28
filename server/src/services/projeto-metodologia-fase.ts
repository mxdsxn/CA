import { ProjetoMetodologiaFaseRepository as Repo } from '@repositories'

/* retorna lista de metodologiaFase do projeto */
const ProjetoFaseByIdProjeto = async (idProjeto: Number) => {
  const listaProjetoMetodologiaFase = await Repo.ProjetoFaseByIdProjeto(idProjeto)

  return listaProjetoMetodologiaFase
}

export default {
  ProjetoFaseByIdProjeto
}
