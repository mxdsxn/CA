import { ProjetoAlocacaoPeriodoRepository as Repo } from '@repositories'

/* retorna lista de alocacoes do colaborador no dia */
const ProjetoAlocacaoPeriodoByIdColaboradorDia = async (idColaborador: Number, diaReferencia: Date) => {
  const listaProjetoAlocacaoPeriodo = await Repo.ProjetoAlocacaoPeriodoByIdColaboradorDia(idColaborador, diaReferencia)

  return listaProjetoAlocacaoPeriodo
}

export default {
  ProjetoAlocacaoPeriodoByIdColaboradorDia
}
