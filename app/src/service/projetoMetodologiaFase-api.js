import baseUrl from './api-base-url'

const ProjetoMetodologiaFaseApi = {
  GetProjetoFaseByIdProjeto: async (idProjeto) => {
    const result = await baseUrl
      .post("ProjetoMetodologiaFase/GetProjetoFaseByIdProjeto", null, {
        params: {
          idProjeto: idProjeto,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  }
}

export default ProjetoMetodologiaFaseApi