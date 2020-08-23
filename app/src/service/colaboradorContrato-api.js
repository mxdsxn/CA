import baseUrl from './api-baseUrl'

const ColaboradorContratoApi = {
  ContratosByDataIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("ColaboradorContrato/ContratosByDataIdColaboradorMes", {
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
  ContratoAtivoByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .get("ColaboradorContrato/ContratoAtivoByIdColaboradorDia", {
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