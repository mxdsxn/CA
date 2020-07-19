/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import { IAtividade, IProjeto } from '@models'
import libUtc from '@libUtc'

const AtividadeService = {
  /* retorna lista de atividades do colaborador em um mes */
  GetAtividadesMesByIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)
    console.log(mesReferenciaFim)
    const listaAtividadeMes = await dbConnection('pessoas.Atividade')
      .select('*')
      .where({
        IdColaborador: idColaborador
      })
      .where('DataAtividade', '>=', mesReferenciaInicio)
      .andWhere('DataAtividade', '<', mesReferenciaFim)
      .orderBy('DataAtividade', 'asc')
      .then((listaAtividadeMes: IAtividade[]) => {
        console.log(listaAtividadeMes.map(x => x.DataAtividade))
        const listaIdsProjeto = listaAtividadeMes.map(x => x.IdProjeto)
        const listaAtividadeComNomeProjeto = dbConnection('operacoes.Projeto')
          .select('IdProjeto', 'Nome')
          .whereIn('IdProjeto', listaIdsProjeto)
          .then((listaNomesProjeto: IProjeto[]) => {
            listaAtividadeMes.map(atividade => {
              atividade.Projeto = listaNomesProjeto.filter(nomeProjeto => nomeProjeto.IdProjeto === atividade.IdProjeto)[0].Nome
            })
            return listaAtividadeMes
          })
        return listaAtividadeComNomeProjeto
      })
    return validationArray(listaAtividadeMes)
  }
}

export default AtividadeService
