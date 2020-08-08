import baseUrl from './api-baseUrl'

const AtividadeApi = {
  GetAtividadesByIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Atividade/GetAtividadesByIdColaboradorMes", null, {
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
  },
  GetAtividadesByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .get("Atividade/GetAtividadesByIdColaboradorDia", null, {
        params: {
          idColaborador: idColaborador,
          diaReferencia: diaReferencia,
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