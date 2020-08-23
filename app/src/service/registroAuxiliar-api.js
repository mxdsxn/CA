import baseUrl from './api-baseUrl'

const RegistroAuxiliarApi = {
  RegistroAuxiliarByIdColaboradorMes: async (idProjeto, mesReferencia) => {
    const result = await baseUrl
      .get("RegistroAuxiliar/RegistroAuxiliarByIdColaboradorMes", {
        params: {
          idProjeto: idProjeto,
          mesReferencia: mesReferencia
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  }
}

export default RegistroAuxiliarApi