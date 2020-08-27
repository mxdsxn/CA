import baseUrl from './api-baseUrl'

const atividadesByIdColaboradorMes = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get("Atividade/AtividadesByIdColaboradorMes", {
        params: {
          idColaborador: idColaborador,
          mesReferencia: mesReferencia,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

const atividadesByIdColaboradorDia = async (idColaborador, diaReferencia) => {
  try {
    const result = await baseUrl
      .get("Atividade/AtividadesByIdColaboradorDia", {
        params: {
          idColaborador: idColaborador,
          diaReferencia: diaReferencia,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

const salvarAtividade = async (
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


export default {
  atividadesByIdColaboradorDia,
  atividadesByIdColaboradorMes,
  salvarAtividade
}