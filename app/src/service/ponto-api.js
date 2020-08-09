import baseUrl from './api-baseUrl'

const PontoApi = {
  GetPontoByIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Ponto/GetPontoByIdColaboradorMes", {
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
      .get("Ponto/GetPontoByIdColaboradorDia", {
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