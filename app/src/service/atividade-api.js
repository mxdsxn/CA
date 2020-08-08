import baseUrl from './api-baseUrl'

const AtividadeApi = {
  GetAtividadesByIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Atividade/GetAtividadesByIdColaboradorMes", {
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
      .get("Atividade/GetAtividadesByIdColaboradorDia", {
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
  },
  SalvarAtividade: async (dadosAtividade) => {
    const result = await baseUrl
      .post("Atividade/SalvarAtividade", null, {
        params: {
          dadosAtividade
        }
      })
  }
}

export default AtividadeApi