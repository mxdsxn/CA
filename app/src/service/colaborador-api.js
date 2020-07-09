import baseUrl from './api-base-url'

const ColaboradorApi = {
  GetCoordenadoresByDia: async (diaReferencia) => {
    const result = await baseUrl
      .post("Colaborador/GetCoordenadoresByDia", null, {
        params: {
          diaReferencia: diaReferencia,
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