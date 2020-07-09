import baseUrl from './api-base-url'

const AtividadeApi = {
  GetAtividadesMesByIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .post("Atividade/GetAtividadesMesByIdColaboradorMes", null, {
        params: {
          idColaborador: idColaborador,
          mesReferencia: mesReferencia,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  }
}

export default AtividadeApi