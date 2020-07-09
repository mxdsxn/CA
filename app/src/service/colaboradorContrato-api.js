import baseUrl from './api-baseUrl'

const ColaboradorContratoApi = {
  GetContratosByDataIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .post("ColaboradorContrato/GetContratosByDataIdColaboradorMes", null, {
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
      .post("ColaboradorContrato/GetContratoAtivoByIdColaboradorDia", null, {
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