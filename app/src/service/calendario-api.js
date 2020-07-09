import baseUrl from './api-base-url'

const CalendarioApi = {
  GetFeriadosByMes: async (mesReferencia) => {
    const result = await baseUrl
      .post("Calendario/GetFeriadosByMes", null, {
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
      .post("Calendario/GetFeriadosByDia", null, {
        params: {
          diaReferencia: diaReferencia,
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