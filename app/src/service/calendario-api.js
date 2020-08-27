import baseUrl from './api-baseUrl'

const feriadosByMes = async (mesReferencia) => {
  try {
    const result = await baseUrl
      .get("Calendario/FeriadosByMes", {
        params: {
          mesReferencia: mesReferencia,
        },
      })
    return result

  } catch (error) {
    console.error(error)
  }
}

const feriadosByDia = async (diaReferencia) => {
  try {
    const result = await baseUrl
      .get("Calendario/FeriadosByDia", {
        params: {
          diaReferencia: diaReferencia,
        },
      })
    return result

  } catch (error) {
    console.error(error)
  }
}

const listaFeriadoFinalSemanaByMes = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get("Calendario/ListaFeriadoFinalSemanaByMes", {
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

export default {
  feriadosByDia,
  feriadosByMes,
  listaFeriadoFinalSemanaByMes
}