import baseUrl from './api-baseUrl'

const pontoByIdColaboradorMes = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get("Ponto/PontoByIdColaboradorMes", {
        params: {
          idColaborador: idColaborador,
          mesReferencia: mesReferencia,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

const pontoByIdColaboradorDia = async (idColaborador, diaReferencia) => {
  try {
    const result = await baseUrl
      .get("Ponto/PontoByIdColaboradorDia", {
        params: {
          idColaborador: idColaborador,
          diaReferencia: diaReferencia,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}


export default {
  pontoByIdColaboradorDia,
  pontoByIdColaboradorMes
}
