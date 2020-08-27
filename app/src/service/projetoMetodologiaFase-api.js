import baseUrl from './api-baseUrl'

const projetoFaseByIdProjeto = async (idProjeto) => {
  try {
    const result = await baseUrl
      .get("ProjetoMetodologiaFase/ProjetoFaseByIdProjeto", {
        params: {
          idProjeto: idProjeto,
        },
      })
    return result

  } catch (error) {
    console.error(error)
  }
}

export default { projetoFaseByIdProjeto }