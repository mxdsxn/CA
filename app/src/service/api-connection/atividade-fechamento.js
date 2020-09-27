import baseUrl from './api-baseUrl'

const fecharSemana = async (idColaborador, diaSemana) => {
  try {
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
