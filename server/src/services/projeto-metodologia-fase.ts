/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { IProjetoMetodologia, IProjetoMetodologiaFase } from '@models'

/* retorna lista de metodologiaFase do projeto */
const ProjetoFaseByIdProjeto = async (IdProjeto: Number) => {
  const listaProjetoMetodologiaFase = await dbConnection('operacoes.ProjetoMetodologiaFase')
    .innerJoin('operacoes.ProjetoMetodologia', 'operacoes.ProjetoMetodologia.IdProjetoMetodologia', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologia')
    .where('operacoes.ProjetoMetodologia.IdProjeto', IdProjeto)
    .andWhere('operacoes.ProjetoMetodologiaFase.Ativa', true)
    .select(
      'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase',
      'operacoes.ProjetoMetodologiaFase.Fase'
    )
    .orderBy('Fase', 'asc')
    .distinct()

  return listaProjetoMetodologiaFase
}

export default {
  ProjetoFaseByIdProjeto
}
