export default interface Calendario {
  IdCalendario: Number;
  Dia: Date;
  HorasUteis: Number;
  Descricao: String;
  IdCidade: Number;
  IdPais: Number;
  IdEstado: Number;
  IdTipoFeriado: Number;
  Recorrente: Boolean;
}
