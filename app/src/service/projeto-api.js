import baseUrl from './api-baseUrl'

const projetosByIdColaboradorDia = async (idColaborador, diaReferencia) => {
  try {
    const result = await baseUrl
      .get('/projeto/list', {
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

const projetosDefault = async (diaReferencia) => {
  try {
    const result = await baseUrl
      .get('/projeto/default/list', {
        params: {
          diaReferencia: diaReferencia,
        },
      })
    return result.data

  } catch (error) {
   console.error(error)
  }
}

export default {
  projetosByIdColaboradorDia,
  projetosDefault
}
