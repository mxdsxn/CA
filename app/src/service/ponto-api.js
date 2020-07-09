import baseUrl from './api-base-url'

const PontoApi = {
  GetPontoByIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .post("Ponto/GetPontoByIdColaboradorMes", null, {
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
  },
  GetPontoByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .post("Ponto/GetPontoByIdColaboradorDia", null, {
        params: {
          idColaborador: idColaborador,
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

export default PontoApi