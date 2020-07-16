/* eslint-disable no-unused-vars */
import dbConnection, { validationArray, validationObject } from '@database'
import { ICalendario } from '@models'
import libUtc from '@libUtc'

const CalendarioService = {
  /* retorna lista de feriados no mes */
  GetFeriadosByMes: async (idColaborador: number, mesReferencia: Date) => {
    const mesReferenciaInicio = mesReferencia
    const mesReferenciaFim = libUtc.getEndMonth(mesReferenciaInicio)

    const listaFeriadosMes = await dbConnection('pessoas.Colaborador')
      .select('IdPostoTrabalho')
      .where('IdColaborador', idColaborador)
      .first()
      .then(ColaboradorPostoTrabalho => {
        const idPostoTrabalho = Number(ColaboradorPostoTrabalho.IdPostoTrabalho)
        const listaFeriadosMes = dbConnection('pessoas.PostoTrabalho')
          .where('IdPostoTrabalho', idPostoTrabalho)
          .first()
          .then(PostoTrabalho => {
            const listaFeriadosMes = dbConnection('pessoas.Calendario')
              .select('*')
              .where('Dia', '>=', mesReferenciaInicio)
              .andWhere('Dia', '<=', mesReferenciaFim)
              .andWhere(function () {
                this.where('IdCidade', PostoTrabalho.IdCidade)
                  .orWhere('IdEstado', PostoTrabalho.IdEstado)
                  .orWhere('IdPais', PostoTrabalho.IdPais)
              })
              .orderBy('Dia', 'asc')
              .then((listaFeriadosMes: ICalendario[]) => (listaFeriadosMes))
            return listaFeriadosMes
          })
        return listaFeriadosMes
      })

    return validationArray(listaFeriadosMes)
  },
}

export default CalendarioService
