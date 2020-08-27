import baseUrl from './api-baseUrl'

const contratosByDataIdColaboradorMes = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get("ColaboradorContrato/ContratosByDataIdColaboradorMes", {
        params: {
          idColaborador: idColaborador,
          mesReferencia: mesReferencia,
        },
      })
    return result

  } catch (error) {
    console.error(error)
  }
}

const contratoAtivoByIdColaboradorDia = async (idColaborador, diaReferencia) => {
  try {
    const result = await baseUrl
      .get("ColaboradorContrato/ContratoAtivoByIdColaboradorDia", {
        params: {
          idColaborador: idColaborador,
          diaReferencia: diaReferencia,
        },
      })
    return result

  } catch (error) {
    console.error(error)
  }
}

export default {
  contratoAtivoByIdColaboradorDia,
  contratosByDataIdColaboradorMes
}