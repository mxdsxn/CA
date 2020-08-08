import baseUrl from './api-baseUrl'

const ProjetoAlocacaoApi = {
  GetProjetoAlocacaoPeriodoByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .get("ProjetoAlocacao/GetProjetoAlocacaoPeriodoByIdColaboradorDia", {
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