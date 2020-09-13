import baseUrl from './api-baseUrl'

const listaAtividadeFechamentoSemanaByIdColaboradorMesAno = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get('/atividade-fechamento-semana/list', {
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

export default {
  listaAtividadeFechamentoSemanaByIdColaboradorMesAno,
}
