import baseUrl from './api-baseUrl'

const ProjetoCategoriaAtividadeApi = {
  GetProjetoCategoriaAtividadeByIdProjeto: async (idProjeto) => {
    const result = await baseUrl
      .get("ProjetoCategoriaAtividade/GetProjetoCategoriaAtividadeByIdProjeto", null, {
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

export default ProjetoCategoriaAtividadeApi