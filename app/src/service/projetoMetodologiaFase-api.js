import baseUrl from './api-baseUrl'

const ProjetoMetodologiaFaseApi = {
  ProjetoFaseByIdProjeto: async (idProjeto) => {
    const result = await baseUrl
      .get("ProjetoMetodologiaFase/ProjetoFaseByIdProjeto", {
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