import baseUrl from './api-baseUrl'

const registroAuxiliarByIdColaboradorMes = async (idProjeto, mesReferencia) => {
  try {
    const result = await baseUrl
      .get("RegistroAuxiliar/RegistroAuxiliarByIdColaboradorMes", {
        params: {
          idProjeto: idProjeto,
          mesReferencia: mesReferencia
        },
      })
    return result

  } catch (error) {
    console.error(error)
  }
}

export default { registroAuxiliarByIdColaboradorMes }