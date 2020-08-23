import baseUrl from './api-baseUrl'

const ColaboradorApi = {
  CoordenadoresByDia: async (diaReferencia) => {
    const result = await baseUrl
      .get("Colaborador/CoordenadoresByDia", {
        params: {
          diaReferencia: diaReferencia,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  },
  DadosBarraProgresso: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Colaborador/DadosBarraProgresso", {
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
  }
}

export default ColaboradorApi