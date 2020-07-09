/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import {
  IProjetoHistoricoGerente,
  IColaborador
} from '@models'
import libUtc from '@libUtc'

const TesteService = {
  Teste: async (DataCadastro: Date) => {
    const mesReferenciaInicio = libUtc.getBeginMonth(DataCadastro)
    const mesReferenciaFim = libUtc.getEndMonth(DataCadastro)

    const projetotipo = await dbConnection('operacoes.ProjetoTipo')
      .select('*')
    const listaAtividadeMes = await dbConnection('operacoes.Projeto')
      .select('IdProjeto',
        'Nome',
        'IdColaborador',
        'IdColaboradorGerente')
      .where('IdProjeto', 2510)
      .first()
      .then(suc => {
        return dbConnection('pessoas.Colaborador').where('IdColaborador', suc.IdColaboradorGerente)
      })
    // gerentes sao coordenadores e prjetos defaout tem qlq gernete como coordenador
    return (listaAtividadeMes)
  }
}
export default TesteService
