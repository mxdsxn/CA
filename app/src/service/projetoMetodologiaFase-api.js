import baseUrl from './api-baseUrl'

const ProjetoMetodologiaFaseApi = {
  GetProjetoFaseByIdProjeto: async (idProjeto) => {
    const result = await baseUrl
      .get("ProjetoMetodologiaFase/GetProjetoFaseByIdProjeto", null, {
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