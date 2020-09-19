import baseUrl from './api-baseUrl'

const fecharSemana = async (idColaborador, diaSemana) => {
  try {
    console.log(idColaborador, diaSemana)
    const result = await baseUrl
      .post('/atividade-fechamento', null, {
        params: {
          idColaborador: idColaborador,
          diaSemana: diaSemana,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

export default {
  fecharSemana,
}
