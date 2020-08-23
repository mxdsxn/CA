import baseUrl from './api-baseUrl'

const PontoApi = {
  PontoByIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Ponto/PontoByIdColaboradorMes", {
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
  PontoByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .get("Ponto/PontoByIdColaboradorDia", {
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