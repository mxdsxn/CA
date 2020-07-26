import baseUrl from './api-baseUrl'

const ProjetoApi = {
  GetProjetosByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .post("Projeto/GetProjetosByIdColaboradorDia", null, {
        params: {
          idColaborador: idColaborador,
          diaReferencia: diaReferencia,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  },
  GetProjetosDefault: async (diaReferencia) => {
    const result = await baseUrl
      .post("Projeto/GetProjetosDefault", null, {
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

export default ProjetoApi