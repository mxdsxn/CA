/* eslint-disable no-unused-vars */
import dbConnection, { validationArray } from '@database'
import { IAtividade, IProjeto } from '@models'
import libUtc from '@libUtc'
import { CalendarioService } from "@services"

const AtividadeService = {
  /* retorna lista de atividades do colaborador em um mes */
  GetAtividadesByIdColaboradorMes: async (idColaborador: number, mesReferencia: Date, naoAgruparDia?: boolean) => {
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

    if (!naoAgruparDia) {
      const listaFeriadosFds = await CalendarioService.GetListaFeriadoFinalSemanaByMes(idColaborador, mesReferencia)
      return AgruparAtividadesPorDia(mesReferencia, listaAtividadeMes, listaFeriadosFds)
    }

    return listaAtividadeMes
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

const AgruparAtividadesPorDia = (mesReferencia: Date, listaAtividade: IAtividade[], listaFeriadosFds: any) => {
  const inicioMes = libUtc.getMonth(mesReferencia)
  const fimMes = libUtc.getEndMonth(inicioMes).getTime() === libUtc.getEndMonth().getTime()
    ? libUtc.getEndDate()
    : libUtc.getEndMonth(inicioMes)

  listaAtividade.push(listaAtividade[0])
  let listaAtividadePorDia: object[] = [{}]
  listaAtividadePorDia.pop()

  for (let dia = inicioMes; dia <= fimMes; dia = libUtc.addDay(dia)) {
    const atividadesDia = listaAtividade.filter(x => x.DataAtividade.getTime() === dia.getTime())
    const feriadoFds = listaFeriadosFds.find(x => x.Dia.getTime() === dia.getTime())
      ? listaFeriadosFds.find(x => x.Dia.getTime() === dia.getTime())
      : null
    const result = { dia, atividadesDia, feriadoFds }
    
    listaAtividadePorDia.push(result)
  }
  return (listaAtividadePorDia)
}