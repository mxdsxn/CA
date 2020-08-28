export default interface RegistroAuxiliarEntity {
  IdRegistroAuxiliar: number
  IdColaborador: number
  Data: Date
  Entrada: string
  SaidaAlmoco: string
  EntradaAlmoco: string
  Saida: string
  SaidaEventual: string
  EntradaEventual: string
  HorasAtestado: string
  JustificativaPonto: string
  Total: string
  DescricaoAtestado: string
  IdJustificativaPonto: number
}
