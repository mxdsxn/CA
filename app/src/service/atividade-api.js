import baseUrl from './api-baseUrl'

const AtividadeApi = {
  AtividadesByIdColaboradorMes: async (idColaborador, mesReferencia) => {
    const result = await baseUrl
      .get("Atividade/AtividadesByIdColaboradorMes", {
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
  AtividadesByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .get("Atividade/AtividadesByIdColaboradorDia", {
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
  SalvarAtividade: async (
    idAtividade,
    diaAtividade,
    cargaAtividade,
    idProjeto,
    idProjetoDefault,
    idCoordenador,
    idProjetoFase,
    idCategoriaAtividade,
    tagsAtividade,
    descricaoAtividade
  ) => {

    await baseUrl
      .post("Atividade/SalvarAtividade", null, {
        params: {
          idAtividade,
          diaAtividade,
          cargaAtividade,
          idProjeto,
          idProjetoDefault,
          idCoordenador,
          idProjetoFase,
          idCategoriaAtividade,
          tagsAtividade,
          descricaoAtividade
        }
      })
  }
}

export default AtividadeApi