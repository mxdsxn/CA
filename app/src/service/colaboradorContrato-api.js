import baseUrl from './api-baseUrl'

const ColaboradorContratoApi = {
  GetContratosByDataIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("ColaboradorContrato/GetContratosByDataIdColaboradorMes", {
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
  GetContratoAtivoByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .get("ColaboradorContrato/GetContratoAtivoByIdColaboradorDia", {
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

export default ColaboradorContratoApi