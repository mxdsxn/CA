import atividadeApi from './atividade-api'

const api = {
  GetAtividadesMesByIdColabMes: (idColab, mesReferencia) => atividadeApi.GetAtividadesMesByIdColabMes(idColab, mesReferencia),

}

export default api