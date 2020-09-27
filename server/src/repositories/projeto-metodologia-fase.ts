/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { ProjetoMetodologiaFaseEntity } from '@entities'

const projetoFaseByIdProjeto = async (IdProjeto: Number): Promise<ProjetoMetodologiaFaseEntity[]> => {
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

const projetoFaseById = async (idProjetoMetologiaFase: number): Promise<ProjetoMetodologiaFaseEntity> => {
  return await dbConnection('operacoes.ProjetoMetodologiaFase')
    .where('IdProjetoMetodologiaFase', idProjetoMetologiaFase)
    .andWhere('operacoes.ProjetoMetodologiaFase.Ativa', true)
    .first()
}

export default {
  projetoFaseById,
  projetoFaseByIdProjeto
}
