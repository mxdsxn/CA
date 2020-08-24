export default interface ProjetoAlocacaoPeriodoEntity {
  IdProjetoAlocacaoPeriodo: number
  IdProjetoAlocacao: number
  DataInicio: Date
  DataFim: Date
  Segunda: boolean
  Terca: boolean
  Quarta: boolean
  Quinta: boolean
  Sexta: boolean
  Sabado: boolean
  Domingo: boolean
  HorasPorDia: Date
  DataFimPrevista: Date
  IdProjetoAlocacaoPerfilGenerico: number
}
