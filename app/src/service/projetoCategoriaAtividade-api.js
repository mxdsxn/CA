import baseUrl from './api-baseUrl'

const projetoCategoriaAtividadeByIdProjeto = async (idProjeto) => {
  try {
    const result = await baseUrl
      .get("projeto-categoria-atividade/list ", {
        params: {
          idProjeto: idProjeto,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

export default { projetoCategoriaAtividadeByIdProjeto }