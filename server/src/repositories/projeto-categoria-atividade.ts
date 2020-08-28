/* eslint-disable no-unused-vars */
import dbConnection from '@database'
import { ProjetoCategoriaAtividadeEntity } from '@entities'

const ProjetoCategoriaAtividadeByIdProjeto = async (IdProjeto: Number): Promise<ProjetoCategoriaAtividadeEntity[]> => {
  return await dbConnection('operacoes.ProjetoCategoriaAtividade')
    .where('IdProjeto', IdProjeto)
    .select('*')
    .orderBy('Descricao', 'asc')
}

export default {
  ProjetoCategoriaAtividadeByIdProjeto
}
