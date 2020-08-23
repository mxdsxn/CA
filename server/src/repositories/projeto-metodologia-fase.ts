/* eslint-disable no-unused-vars */
import dbConnection from '@database'

const ProjetoFaseByIdProjeto = async (IdProjeto: Number) => {
  return await dbConnection('operacoes.ProjetoMetodologiaFase')
    .innerJoin('operacoes.ProjetoMetodologia', 'operacoes.ProjetoMetodologia.IdProjetoMetodologia', 'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologia')
    .where('operacoes.ProjetoMetodologia.IdProjeto', IdProjeto)
    .andWhere('operacoes.ProjetoMetodologiaFase.Ativa', true)
    .select(
      'operacoes.ProjetoMetodologiaFase.IdProjetoMetodologiaFase',
      'operacoes.ProjetoMetodologiaFase.Fase'
    )
    .orderBy('Fase', 'asc')
    .distinct()
}

export default {
  ProjetoFaseByIdProjeto
}
