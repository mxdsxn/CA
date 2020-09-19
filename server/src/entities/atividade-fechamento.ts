import { Moment } from "moment";

export default interface atividadeFechamento {
  IdAtividadeFechamento: number,
  IdColaborador: number,
  IdColaboradorAprovador?: number,
  IdProjeto?: number,
  IdAtividadeFechamentoStatus: number,
  Ano: number,
  Mes: number,
  Semana: number,
  DataFechamento: Moment
  DataAprovacao?: Moment
}
