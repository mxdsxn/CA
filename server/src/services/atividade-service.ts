/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import { IAtividade, IProjeto } from '@models'
import libUtc from '@libUtc'

const AtividadeService = {
  /* retorna lista de atividades do colaborador em um mes */
  GetAtividadesByIdColaboradorMes: async (idColaborador: Number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    const listaAtividadeMes = await dbConnection('pessoas.Atividade')
      .select('*')
      .where({
        IdColaborador: idColaborador
      })
      .where('DataAtividade', '>=', mesReferenciaInicio)
      .andWhere('DataAtividade', '<', mesReferenciaFim)
      .orderBy('DataAtividade', 'asc')
      .then((listaAtividadeMes: IAtividade[]) => {
        (listaAtividadeMes.map(x => x.DataAtividade))
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
    return tst(mesReferencia, listaAtividadeMes)
    // return validationArray(listaAtividadeMes)
  },
  GetAtividadesByIdColaboradorDia: async (idColaborador: Number, diaReferencia: Date) => {
    const listaAtividadeMes = await dbConnection('pessoas.Atividade')
      .select('*')
      .where({
        IdColaborador: idColaborador
      })
      .where('DataAtividade', diaReferencia)
      .orderBy('DataAtividade', 'asc')
      .then((listaAtividadeMes: IAtividade[]) => {
        (listaAtividadeMes.map(x => x.DataAtividade))
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

const tst = (mesReferencia: Date, listaAtividade: IAtividade[]) => {
  const inicioMes = libUtc.getMonth(mesReferencia)
  const fimMes = libUtc.getEndMonth(inicioMes)

  let listaAtividadePorDia: object[] = [{}]
  listaAtividadePorDia.pop()

  for (let dia = inicioMes; dia <= fimMes; dia = libUtc.addDay(dia)) {
    const atividadesDia = listaAtividade.filter(x => x.DataAtividade.getTime() === dia.getTime())
    const result = { dia, atividadesDia }
    listaAtividadePorDia.push(result)
  }
  return (listaAtividadePorDia)
}