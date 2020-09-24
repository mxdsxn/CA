import baseUrl from './api-baseUrl'

const contratosByDataIdColaboradorMes = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get('/colaborador-contrato/list', {
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

const contratoAtivoByIdColaboradorDia = async (idColaborador, diaReferencia) => {
  try {
    const result = await baseUrl
      .get('/colaborador-contrato', {
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
  contratoAtivoByIdColaboradorDia,
  contratosByDataIdColaboradorMes
}
