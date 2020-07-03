import atividadeApi from './atividade-api'

const api = {
  GetAtividadesMesByIdColaboradorMes: (idColaborador, mesReferencia) => atividadeApi.GetAtividadesMesByIdColaboradorMes(idColaborador, mesReferencia),

}

export default api