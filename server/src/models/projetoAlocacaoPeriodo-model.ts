export default interface IProjetoAlocacaoPeriodo {
  IdProjetoAlocacaoPeriodo: Number,
  IdProjetoAlocacao: Number,
  DataInicio: Date,
  DataFim: Date,
  Segunda: Boolean,
  Terca: Boolean,
  Quarta: Boolean,
  Quinta: Boolean,
  Sexta: Boolean,
  Sabado: Boolean,
  Domingo: Boolean,
  HorasPorDia: Date,
  DataFimPrevista: Date,
  IdProjetoAlocacaoPerfilGenerico: Number
}
