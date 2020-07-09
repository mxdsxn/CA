import baseUrl from './api-base-url'

const RegistroAuxiliarApi = {
  GetRegistroAuxiliarByIdColaboradorMes: async (idProjeto, mesReferencia) => {
    const result = await baseUrl
      .post("RegistroAuxiliar/GetRegistroAuxiliarByIdColaboradorMes", null, {
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