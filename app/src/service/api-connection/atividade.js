import baseUrl from './api-baseUrl'

const atividadesByIdColaboradorMes = async (idColaborador, mesReferencia) => {
  try {
    const result = await baseUrl
      .get('/atividade/list/mes', {
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
      .get('/atividade/list/dia', {
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

const atividadeById = async (idColaborador, idAtividade) => {
  try {
    const result = await baseUrl
      .get('/atividade', {
        params: {
          idColaborador: idColaborador,
          idAtividade: idAtividade,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

const salvarAtividade = async (
  idColaborador,
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
    .post('/atividade', null, {
      params: {
        idColaborador,
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

const editarAtividade = async (
  idColaborador,
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
    .put('/atividade', null, {
      params: {
        idColaborador,
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

const deletarAtividade = async (idAtividade) => {
  const result = await baseUrl
    .delete('/atividade', {
      params: {
        idAtividade: idAtividade,
      },
    })
  return result
}


export default {
  atividadeById,
  atividadesByIdColaboradorDia,
  atividadesByIdColaboradorMes,
  salvarAtividade,
  editarAtividade,
  deletarAtividade
}
