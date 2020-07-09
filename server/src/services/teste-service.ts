/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import {
  IProjeto,
  IProjetoTipo
} from '@models'
import libUtc from '@libUtc'

const TesteService = {
  Teste: async (DataCadastro: Date) => {
    const mesReferenciaInicio = libUtc.getBeginMonth(DataCadastro)
    const mesReferenciaFim = libUtc.getEndMonth(DataCadastro)

    const idProjetoDefault = await dbConnection('operacoes.ProjetoTipo')
      .select('IdProjetoTipo')
      .where('Descricao', 'Default')
      .first()
      .then((TipoDefault: IProjetoTipo) => TipoDefault.IdProjetoTipo)

    const listaProjetosDefault = await dbConnection('operacoes.Projeto')
      .select('*')
      .where('IdProjetoTipo', idProjetoDefault)
      .first()
      .then((listaProjetosDefault: IProjeto[]) => listaProjetosDefault)

    return (listaProjetosDefault)
  }
}
export default TesteService
