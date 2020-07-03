import baseUrl from './api-base-url'

const projetoApi = {
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
  }
}

export default projetoApi