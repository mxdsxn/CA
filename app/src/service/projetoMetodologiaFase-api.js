import baseUrl from './api-baseUrl'

const projetoFaseByIdProjeto = async (idProjeto) => {
  try {
    const result = await baseUrl
      .get('/projeto-metodologia-fase/list', {
        params: {
          idProjeto: idProjeto,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

export default { projetoFaseByIdProjeto }
