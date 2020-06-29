import api from './apiUrl'

const AtividadeService = {
  GetAtividadesMesByIdColabMes: async (idColab, mesReferencia) => {
    const result = await api
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

export default AtividadeService