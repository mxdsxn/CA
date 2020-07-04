import baseUrl from './api-base-url'

const projetoMetodologiaFase = {
  GetProjetoFaseByIdProjeto: async (idProjeto) => {
    const result = await baseUrl
      .post("ProjetoMetodologiaFase/GetProjetoFaseByIdProjeto", null, {
        params: {
          IdProjeto: idProjeto,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  }
}

export default projetoMetodologiaFase