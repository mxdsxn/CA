import api from '@apiUrl'

const AtividadeService = {
  GetAtividadesMesByIdColabMes: (idColab, mesReferencia) => {
    api
      .post("Atividade/GetAtividadesMesByIdColabMes", null, {
        params: {
          IdColab: 2359,
          Data: mesReferencia.toLocaleDateString(),
        },
      })
      .then(
        res => res.data,
        err => console.log(err)
      );
  }
}

export default AtividadeService