import baseUrl from './api-baseUrl'

const CalendarioApi = {
  GetFeriadosByMes: async (mesReferencia) => {
    const result = await baseUrl
      .get("Calendario/GetFeriadosByMes", null, {
        params: {
          mesReferencia: mesReferencia,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  },
  GetFeriadosByDia: async (diaReferencia) => {
    const result = await baseUrl
      .get("Calendario/GetFeriadosByDia", null, {
        params: {
          diaReferencia: diaReferencia,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  },
  GetListaFeriadoFinalSemanaByMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Calendario/GetListaFeriadoFinalSemanaByMes", null, {
        params: {
          idColaborador: idColaborador,
          mesReferencia: mesReferencia,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  }
}

export default CalendarioApi