import baseUrl from './api-baseUrl'

const coordenadoresByDia = async (diaReferencia) => {
  try {
    const result = await baseUrl
      .get("/colaboraodor/coordenador/list/dia", {
        params: {
          diaReferencia: diaReferencia,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

const dadosBarraProgresso = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get("/atividade/horas", {
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
  coordenadoresByDia,
  dadosBarraProgresso
}