import baseUrl from './api-baseUrl'

const ProjetoApi = {
  ProjetosByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .get("Projeto/ProjetosByIdColaboradorDia", {
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
  ProjetosDefault: async (diaReferencia) => {
    const result = await baseUrl
      .get("Projeto/ProjetosDefault", {
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