import atividadeApi from './atividade-api'
import projetoApi from './projeto-api'
import projetoMetodologiaFaseApi from './projeto-metodologia-fase-api'

const api = {
  GetAtividadesMesByIdColaboradorMes: (idColaborador, mesReferencia) =>
    atividadeApi.GetAtividadesMesByIdColaboradorMes(idColaborador, mesReferencia),
  GetProjetosByIdColaboradorDia: (idColaborador, diaReferencia) =>
    projetoApi.GetProjetosByIdColaboradorDia(idColaborador, diaReferencia),
  GetProjetoFaseByIdProjeto: (idProjeto) =>
    projetoMetodologiaFaseApi.GetProjetoFaseByIdProjeto(idProjeto),
}

export default api