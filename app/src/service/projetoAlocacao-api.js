import baseUrl from './api-base-url'

const ProjetoAlocacaoApi = {
  GetProjetoAlocacaoPeriodoByIdColaboradorDia: async (idColaborador, diaReferencia) => {
    const result = await baseUrl
      .post("ProjetoAlocacao/GetProjetoAlocacaoPeriodoByIdColaboradorDia", null, {
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