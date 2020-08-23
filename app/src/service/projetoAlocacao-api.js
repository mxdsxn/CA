import baseUrl from './api-baseUrl'

const ProjetoAlocacaoApi = {
  ProjetoAlocacaoPeriodoByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .get("ProjetoAlocacao/ProjetoAlocacaoPeriodoByIdColaboradorDia", {
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

export default ProjetoAlocacaoApi