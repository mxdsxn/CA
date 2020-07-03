import atividadeApi from './atividade-api'
import projetoApi from './projeto-api'

const api = {
  GetAtividadesMesByIdColaboradorMes: (idColaborador, mesReferencia) =>
    atividadeApi.GetAtividadesMesByIdColaboradorMes(idColaborador, mesReferencia),
  GetProjetosByIdColaboradorDia: (idColaborador, diaReferencia) =>
    projetoApi.GetProjetosByIdColaboradorDia(idColaborador, diaReferencia),
}

export default api