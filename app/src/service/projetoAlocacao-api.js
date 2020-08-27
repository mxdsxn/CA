import baseUrl from './api-baseUrl'

const projetoAlocacaoPeriodoByIdColaboradorDia = async (idColaborador, diaReferencia) => {
  try {
    const result = await baseUrl
      .get("ProjetoAlocacao/ProjetoAlocacaoPeriodoByIdColaboradorDia", {
        params: {
          idColaborador: idColaborador,
          diaReferencia: diaReferencia,
        },
      })
    return result

  }
  catch (error) {
    console.error(error)
  }
}

export default { projetoAlocacaoPeriodoByIdColaboradorDia }