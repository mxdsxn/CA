import baseUrl from './api-baseUrl'

const coordenadoresByDia = async (diaReferencia) => {
  try {
    const result = await baseUrl
      .get("Colaborador/CoordenadoresByDia", {
        params: {
          diaReferencia: diaReferencia,
        },
      })
    return result

  } catch (error) {
    console.error(error)
  }
}

const dadosBarraProgresso = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get("Colaborador/DadosBarraProgresso", {
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
  coordenadoresByDia,
  dadosBarraProgresso
}