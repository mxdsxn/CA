import baseUrl from './api-base-url'

const atividadeApi = {
  GetAtividadesMesByIdColabMes: async (idColab, mesReferencia) => {
    const result = await baseUrl
      .post("Atividade/GetAtividadesMesByIdColabMes", null, {
        params: {
          IdColab: idColab,
          Data: mesReferencia,
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      )
    return result
  }
}

export default atividadeApi