export default interface CalendarioEntity {
  IdCalendario: Number
  Dia: Date
  HorasUteis: Number
  Descricao: String
  IdCidade: Number
  IdPais: Number
  IdEstado: Number
  IdTipoFeriado: Number
  Recorrente: Boolean
}
