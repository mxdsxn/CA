import dbConnection from '@database'

const ProjetoCategoriaAtividadeByIdProjeto = async (IdProjeto: Number) => {
  return await dbConnection('operacoes.ProjetoCategoriaAtividade')
    .where('IdProjeto', IdProjeto)
    .select('*')
    .orderBy('Descricao', 'asc')
}
export default {
  ProjetoCategoriaAtividadeByIdProjeto
}
