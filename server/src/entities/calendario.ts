export default interface CalendarioEntity {
  IdCalendario: number
  Dia: Date
  HorasUteis: number
  Descricao: string
  IdCidade: number
  IdPais: number
  IdEstado: number
  IdTipoFeriado: number
  Recorrente: boolean
}
