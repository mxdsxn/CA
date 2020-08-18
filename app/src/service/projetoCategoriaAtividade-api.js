import baseUrl from './api-baseUrl'

const ProjetoCategoriaAtividadeApi = {
  ProjetoCategoriaAtividadeByIdProjeto: async (idProjeto) => {
    const result = await baseUrl
      .get("ProjetoCategoriaAtividade/ProjetoCategoriaAtividadeByIdProjeto", {
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