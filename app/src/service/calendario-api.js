import baseUrl from './api-baseUrl'

const CalendarioApi = {
  FeriadosByMes: async (mesReferencia) => {
    const result = await baseUrl
      .get("Calendario/FeriadosByMes", {
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
  FeriadosByDia: async (diaReferencia) => {
    const result = await baseUrl
      .get("Calendario/FeriadosByDia", {
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
  ListaFeriadoFinalSemanaByMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Calendario/ListaFeriadoFinalSemanaByMes", {
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