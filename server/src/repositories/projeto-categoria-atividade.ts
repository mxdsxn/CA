/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { ProjetoCategoriaAtividadeEntity } from '@entities'

const projetoCategoriaAtividadeByIdProjeto = async (IdProjeto: Number): Promise<ProjetoCategoriaAtividadeEntity[]> => {
  return await dbConnection('operacoes.ProjetoCategoriaAtividade')
    .where('IdProjeto', IdProjeto)
    .select('*')
    .orderBy('Descricao', 'asc')
}

const projetoCategoriaAtividadeById = async (idProjetoCategoriaAtividade: Number): Promise<ProjetoCategoriaAtividadeEntity> => {
  return await dbConnection('operacoes.ProjetoCategoriaAtividade')
    .where('IdProjetoCategoriaAtividade', idProjetoCategoriaAtividade)
    .select('*')
    .first()
}

export default {
  projetoCategoriaAtividadeById,
  projetoCategoriaAtividadeByIdProjeto
}
