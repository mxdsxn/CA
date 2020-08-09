import baseUrl from './api-baseUrl'

const ColaboradorApi = {
  GetCoordenadoresByDia: async (diaReferencia) => {
    const result = await baseUrl
      .get("Colaborador/GetCoordenadoresByDia", {
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
  GetDadosBarraProgresso: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Colaborador/GetDadosBarraProgresso", {
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